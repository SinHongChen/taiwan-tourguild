import DispatchHookByCategory from './DispatchHookByCategory';
import { useEffect, useState } from 'react';
import SmallCardRow from 'components/rows/SmallCardRow';
import ChangePageFooter from './ChangePageFooter';
import styled from 'styled-components';

const Container = styled.div`

`

const ResultByPosition = ({
    title,
    slice,
    isShow,
    canChangePage,
    searchParams,
    style,
    className
}) => {
    const sliceExtraNumber = slice + 1;
    const [showIsNotFoundAnimation, setShowIsNotFoundAnimation] = useState(false);
    const [showSearchingAnimation, setShowSearchingAnimation] = useState(false);
    const [haveNextPage, setHaveNextPage] = useState(false);
    const {
        updateSkip,
        updateResultData,
        getResultDataByPosition,
        getCurrentResultData
    } = DispatchHookByCategory(searchParams.category);

    /**
     * 檢查有無下一頁,特殊作法!!
     * step 01. 將分頁的數量 slice 加上 1 賦值給 sliceExtraNumber 
     * step 02. 每次撈取的 top 參數實際是 sliceExtraNumber , 但是只會顯示 slice 筆數
     * step 03. 檢查是否每次都有撈到 sliceExtraNumber 數量
     * step 04. 如果每次都有辦法等於 sliceExtraNumber 代表有下一頁
     * @param {*} resultDataLength resultData 的數量
     * @param {*} sliceExtraNumber slice 加 1
     * @returns 
     */
    function checkHaveNextPage(data, sliceExtraNumber) {
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

    const isParamExist = (param) => {
        if (param !== undefined && param !== null) {
            return true;
        }
        return false;
    }


    const searchCurrentPageResult = (currentSkip) => {
        getResultDataByPosition(searchParams.lat, searchParams.lon, searchParams.distance, sliceExtraNumber, currentSkip)
            .then((data) => {
                onSearchCurrentPageResultSucceed(data)
            })
            .catch((err) => {
                onSearchCurrentPageResultError(err);
            })
    }

    const onSearchCurrentPageResultSucceed = (data) => {
        setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
        setShowIsNotFoundAnimation(isNotFound(data));
        setShowSearchingAnimation(false);
        updateResultData(data.slice(0, slice));
    }


    const onSearchCurrentPageResultError = (err) => {
        console.error(err);
        setShowIsNotFoundAnimation(true);
        setShowSearchingAnimation(false);
        setHaveNextPage(false);
        updateResultData([]);
    }


    useEffect(() => {
        if (isParamExist(searchParams.lat) && isParamExist(searchParams.lon)) {
            let currentSkip = calculateSkip(searchParams.page, sliceExtraNumber);
            setShowSearchingAnimation(true);
            searchCurrentPageResult(currentSkip);
            updateSkip(currentSkip);
        }
    }, [searchParams]);


    //TODO: 尚未決定要如何處理換頁
    const handleNextPageBtnClick = () => { }
    //TODO: 尚未決定要如何處理換頁
    const handlePreviousPageBtnClick = () => { }


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
            {canChangePage &&
                <ChangePageFooter
                    currentPage={searchParams.page}
                    handleNextPageClick={handleNextPageBtnClick}
                    handlePreviousPageClick={handlePreviousPageBtnClick}
                    haveNextPage={haveNextPage}
                    havePreviousPage={false}
                />
            }

        </Container>
    )
}

export default ResultByPosition;
