import DispatchHookByCategory from './DispatchHookByCategory';
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import SmallCardRow from 'components/cardRows/SmallCardRow';
import ChangePageFooter from './ChangePageFooter';

const ResultByPosition = ({
    slice,
    show,
    lat,
    lon,
    distance,
    category,
    title,
    canChangePage
}) => {
    const sliceExtraNumber = slice + 1;
    const location = useLocation();
    const [showIsNotFoundAnimation, setShowIsNotFoundAnimation] = useState(false);
    const [showSearchingAnimation, setShowSearchingAnimation] = useState(false);
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get('page')));
    const {
        updateSkip,
        getSkip,
        updateResultData,
        getResultDataByPosition,
        getCurrentResultData
    } = DispatchHookByCategory(category);

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
        getResultDataByPosition(lat, lon, distance, sliceExtraNumber, currentSkip)
            .then((data) => {
                onSearchCurrentPageResultSuccess(data)
            })
            .catch((err) => {
                onSearchCurrentPageResultError(err);
            })
    }

    const onSearchCurrentPageResultSuccess = (data) => {
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
        if (isParamExist(lat) && isParamExist(lon)) {
            let currentSkip = calculateSkip(currentPage, slice);
            searchCurrentPageResult(currentSkip);
        }
    }, [lat, lon, distance]);

    // URL search 更新觸發
    useEffect(() => {
        if (canChangePage) {
            let page = parseInt(new URLSearchParams(location.search).get('page'));
            setCurrentPage(page);
        }
    }, [location.search])


    useEffect(() => {
        if (isParamExist(lat) && isParamExist(lon)) {
            let currentSkip = calculateSkip(currentPage, sliceExtraNumber);
            setShowSearchingAnimation(true);
            searchCurrentPageResult(currentSkip);
            updateSkip(currentSkip);
        }
    }, [currentPage])


    //TODO: 尚未決定要如何處理換頁
    const handleNextPageBtnClick = () => { }
    //TODO: 尚未決定要如何處理換頁
    const handlePreviousPageBtnClick = () => { }


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
                    handleNextPageClick={handleNextPageBtnClick}
                    handlePreviousPageClick={handlePreviousPageBtnClick}
                    haveNextPage={haveNextPage}
                    havePreviousPage={false}
                />
            }

        </div>
    )
}

export default ResultByPosition;
