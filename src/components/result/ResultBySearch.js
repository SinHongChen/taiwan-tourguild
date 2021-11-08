import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import SmallCardRow from 'components/cardRows/SmallCardRow';
import ChangePageFooter from './ChangePageFooter';
import DispatchHookByCategory from './DispatchHookByCategory';


const ResultBySearch = ({
    slice,
    show,
    city,
    keyword,
    category,
    title,
    canChangePage,
}) => {
    const history = useHistory();
    const location = useLocation();
    const sliceExtraNumber = slice + 1;
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [showIsNotFoundAnimation, setShowIsNotFoundAnimation] = useState(false);
    const [showSearchingAnimation, setShowSearchingAnimation] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get('page')));
    const {
        updateSkip,
        getSkip,
        updateResultData,
        getResultDataBySearch,
        getCurrentResultData
    } = DispatchHookByCategory(category);

    // 搜尋參數更新觸發
    useEffect(() => {
        if (isParamExist(city) && isParamExist(keyword) && isParamExist(category)) {
            let currentSkip = calculateSkip(currentPage, slice);
            setShowSearchingAnimation(true);
            searchCurrentPageResult(currentSkip);
        }
    }, [city, keyword, category]);

    // URL search 更新觸發
    useEffect(() => {
        if (canChangePage && isParamExist(city) && isParamExist(keyword) && isParamExist(category)) {
            let currentPage = parseInt(new URLSearchParams(location.search).get('page'));
            let currentSkip = calculateSkip(currentPage, slice);
            setCurrentPage(currentPage);
            updateSkip(currentSkip);
            setShowSearchingAnimation(true);
            searchCurrentPageResult(currentSkip);
        }
    }, [location.search]);

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

    const isParamExist = (param) => {
        if (param !== undefined && param !== null) {
            return true;
        }
        return false;
    }

    const searchCurrentPageResult = (currentSkip) => {
        getResultDataBySearch(city, keyword, sliceExtraNumber, currentSkip)
            .then((data) => {
                onGetResultDataBySearchSuccess(data);
            })
            .catch((err) => {
                onGetResultDataBySearchError(err);
            })
    }

    const onGetResultDataBySearchSuccess = (data) => {
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


    const handelNextPageBtnClick = () => {
        if (haveNextPage) {
            history.push(`/searchResult?city=${city}&category=${category}&keyword=${keyword}&page=${currentPage + 1}`);
        }
    }

    const handelPreviousPageBtnClick = () => {
        if (currentPage > 1) {
            history.push(`/searchResult?city=${city}&category=${category}&keyword=${keyword}&page=${currentPage - 1}`);
        }
    }

    return (
        <div>
            <SmallCardRow
                show={show}
                title={title}
                list={getCurrentResultData()}
                logo={"rectangle"}
                isSearching={showSearchingAnimation}
                isNotFound={showIsNotFoundAnimation}
                category={category}
            />
            {canChangePage &&
                <ChangePageFooter
                    currentPage={currentPage}
                    handleNextPageBtnClick={handelNextPageBtnClick}
                    handlePreviousPageBtnClick={handelPreviousPageBtnClick}
                    haveNextPage={haveNextPage}
                    havePreviousPage={currentPage > 1}
                />
            }
        </div>
    )
}



export default ResultBySearch;