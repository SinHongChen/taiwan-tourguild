import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import SmallCardRow from 'components/rows/SmallCardRow';
import ChangePageFooter from './ChangePageFooter';
import DispatchHookByCategory from './DispatchHookByCategory';
import styled from 'styled-components';

const Container = styled.div`

`

const ResultBySearch = ({
    title,
    slice,
    isShow,
    searchParams,
    canChangePage,
    style,
    className
}) => {
    const history = useHistory();
    const sliceExtraNumber = slice + 1;
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [showIsNotFoundAnimation, setShowIsNotFoundAnimation] = useState(false);
    const [showSearchingAnimation, setShowSearchingAnimation] = useState(false);
    const {
        updateSkip,
        updateResultData,
        getResultDataByKeywordAndCity,
        getCurrentResultData
    } = DispatchHookByCategory(searchParams.category);

    useEffect(() => {
        onSearchParamsEffect(searchParams);
    }, [searchParams]);

    const onSearchParamsEffect = (searchParams) => {
        if (isSearchParamsExist(searchParams)) {
            let currentSkip = calculateSkip(searchParams.page, slice);
            updateSkip(currentSkip);
            setShowSearchingAnimation(true);
            searchCurrentPageResult(currentSkip);
        }
    }

    const checkHaveNextPage = (data, sliceExtraNumber) => {
        if (data.length === sliceExtraNumber) {
            return true;
        } else {
            return false;
        }
    }

    const isNotFound = (data) => {
        if (data.length <= 0) {
            return true;
        } else {
            return false;
        }
    }

    const calculateSkip = (currentPage, slice) => {
        return (currentPage - 1) * slice;
    }

    const isSearchParamsExist = (searchParams) => {
        let values = Object.values(searchParams);
        for (let i = 0; i < values.length; i++) {
            if (values[i] === undefined || values[i] === null) {
                return false;
            }
        }
        return true;
    }

    const searchCurrentPageResult = (currentSkip) => {
        getResultDataByKeywordAndCity(
            searchParams.city,
            searchParams.keyword,
            sliceExtraNumber,
            currentSkip
        )
            .then((data) => {
                onGetResultDataBySearchSucceed(data);
            })
            .catch((err) => {
                onGetResultDataBySearchError(err);
            })
    }

    const onGetResultDataBySearchSucceed = (data) => {
        setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
        setShowIsNotFoundAnimation(isNotFound(data));
        setShowSearchingAnimation(false);
        updateResultData(data.slice(0, slice));
    }


    const onGetResultDataBySearchError = (err) => {
        setShowIsNotFoundAnimation(true);
        setShowSearchingAnimation(false);
        setHaveNextPage(false);
        updateResultData([]);
        console.error(err);
    }

    const refreshPage = (page) => {
        history.push(`/searchResult?city=${searchParams.city}&category=${searchParams.category}&keyword=${searchParams.keyword}&page=${page}`);
    }

    const handelNextPageBtnClick = () => {
        if (haveNextPage) {
            refreshPage(searchParams.page + 1);
        }
    }

    const handelPreviousPageBtnClick = () => {
        if (searchParams.page > 1) {
            refreshPage(searchParams.page - 1);
        }
    }

    return (
        <Container style={style} className={className}>
            <SmallCardRow
                isShow={isShow}
                title={title}
                list={getCurrentResultData()}
                logo={"rectangle"}
                isSearching={showSearchingAnimation}
                isNotFound={showIsNotFoundAnimation}
                category={searchParams.category}
            />
            <ChangePageFooter
                isShow={canChangePage}
                currentPage={searchParams.page}
                handleNextPageBtnClick={handelNextPageBtnClick}
                handlePreviousPageBtnClick={handelPreviousPageBtnClick}
                haveNextPage={haveNextPage}
                havePreviousPage={searchParams.page > 1}
            />
        </Container>
    )
}



export default ResultBySearch;