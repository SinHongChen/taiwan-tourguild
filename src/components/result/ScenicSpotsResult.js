import React, { useEffect } from 'react'
import { SmallCardRow } from 'components/hub/CarRowHub';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ChangePageFooter from './ChangePageFooter';
import useScenicSpot from 'hook/useScenicSpot';


const Container = styled.div`

`

//#region 共通的 method
const checkHaveNextPage = (data, sliceExtraNumber) => {
    if (data.length === sliceExtraNumber) {
        return true;
    } else {
        return false;
    }
}

const checkIsNotFound = (data) => {
    if (data.length <= 0) {
        return true;
    } else {
        return false;
    }
}
//#endregion

/**
 * 如何判斷有沒有下一頁的特殊作法 !!! 這是完全不正確的方式,但是受限 API 沒有開好接口
 * 每次撈取數量比要顯示的數量多一筆 , 判斷是撈取數量是否有達到極限 , 如果小於則代表沒有下一筆
 */

const ScenicSpotsResultBySearch = ({
    slice,
    show,
    city,
    keyword,
    category,
    title,
    enablePageChange
}) => {
    const scenicSpot = useScenicSpot();
    const history = useHistory();
    const location = useLocation();
    const sliceExtraNumber = slice + 1;
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const searchScenicSpots = (page) => {
        let skip = (page - 1) * slice;
        scenicSpot.setSkip(skip);
        scenicSpot.getScenicSpotsBySearch(city, keyword, sliceExtraNumber, skip)
            .then((data) => {
                setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
                setIsNotFound(checkIsNotFound(data));
                setIsSearching(false);
                scenicSpot.setScenicSpots(data.slice(0, slice));
            })
            .catch((err) => {
                console.error(err);
                setIsNotFound(true);
                setIsSearching(false);
                setHaveNextPage(false);
                scenicSpot.setScenicSpots([]);
            })
    }

    useEffect(() => {
        searchScenicSpots(1);
        scenicSpot.setSkip(0);
    }, [city, keyword])


    // URL page 參數更新的時候 -> 更新當前頁面 state
    useEffect(() => {
        if (enablePageChange) {
            let page = parseInt(new URLSearchParams(location.search).get('page'));
            setCurrentPage(page);
        }
    }, [location.search])


    // 當前頁面 state 更新的時候 -> 更新 scenicSpot 資料
    useEffect(() => {
        setIsSearching(true);
        searchScenicSpots(currentPage);
    }, [currentPage])


    const handleNextPageBtnClick = () => {
        if (haveNextPage) {
            history.push(`/searchResult?city=${city}&category=${category}&keyword=${keyword}&page=${currentPage + 1}`);
        }
    }

    const handlePreviousPageBtnClick = () => {
        if (currentPage > 1) {
            console.log(currentPage - 1)
            history.push(`/searchResult?city=${city}&category=${category}&keyword=${keyword}&page=${currentPage - 1}`);
        }
    }

    return (
        <Container>
            <SmallCardRow
                show={show}
                title={title ? title : "景點"}
                list={scenicSpot.scenicSpots}
                logo={"rectangle"}
                isSearching={isSearching}
                isNotFound={isNotFound}
                category={category}
            />
            {enablePageChange &&
                <ChangePageFooter
                    currentPage={currentPage}
                    handleNextPageBtnClick={handleNextPageBtnClick}
                    handlePreviousPageBtnClick={handlePreviousPageBtnClick}
                    haveNextPage={haveNextPage}
                    havePreviousPage={currentPage > 1}
                />
            }
        </Container>

    )
}

const ScenicSpotsResultByPosition = ({
    slice,
    show,
    lat,
    lon,
    distance,
    category,
    title,
    enablePageChange
}) => {
    const scenicSpot = useScenicSpot();
    const sliceExtraNumber = slice + 1;
    const location = useLocation();
    const history = useHistory();
    const [isNotFound, setIsNotFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const checkHaveCoord = (lat, lon) => {
        return lat && lon;
    }

    const searchScenicSpots = (page) => {
        let skip = (page - 1) * slice;
        scenicSpot.setSkip(skip);
        scenicSpot.getScenicSpotsByPosition(lat, lon, distance, sliceExtraNumber, skip)
            .then((data) => {
                setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
                setIsNotFound(checkIsNotFound(data));
                setIsSearching(false);
                scenicSpot.setScenicSpots(data.slice(0, slice));
            })
            .catch((err) => {
                console.error(err);
                setIsNotFound(true);
                setIsSearching(false);
                setHaveNextPage(false);
                scenicSpot.setScenicSpots([]);
            })
    }


    useEffect(() => {
        if (checkHaveCoord(lat, lon)) {
            searchScenicSpots(1);
            scenicSpot.setSkip(0);
        }
    }, [lat, lon, distance]);

    // URL page 參數更新的時候 -> 更新當前頁面 state
    useEffect(() => {
        if (enablePageChange) {
            let page = parseInt(new URLSearchParams(location.search).get('page'));
            setCurrentPage(page);
        }
    }, [location.search])


    // 當前頁面 state 更新的時候 -> 更新 scenicSpot 資料
    useEffect(() => {
        setIsSearching(true);
        searchScenicSpots(currentPage);
    }, [currentPage])


    const handlePageChange = () => {
        history.push(`/positionResult?page=${currentPage + 1}`);
    }


    return (
        <Container>
            <SmallCardRow
                show={show}
                title={title ? title : "景點"}
                list={scenicSpot.scenicSpots}
                logo={"rectangle"}
                isSearching={isSearching}
                isNotFound={isNotFound}
                category={category}
            />
            {
                enablePageChange &&
                <ChangePageFooter
                    currentPage={currentPage}
                    handleNextPageClick={handlePageChange}
                    handlePreviousPageClick={handlePageChange}
                    haveNextPage={haveNextPage}
                    havePreviousPage={false}
                />
            }

        </Container>
    )
}


const ScenicSpotsResultByClass = ({
    slice,
    show,
    scenicSpotClass,
    category,
    title,
    enablePageChange
}) => {
    const scenicSpot = useScenicSpot();
    const location = useLocation();
    const sliceExtraNumber = slice + 1;
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);


    const searchScenicSpots = (page) => {
        let skip = (page - 1) * slice;
        scenicSpot.setSkip(skip);
        scenicSpot.getScenicSpotsByClass(scenicSpotClass, sliceExtraNumber, skip)
            .then((data) => {
                setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
                setIsNotFound(checkIsNotFound(data));
                setIsSearching(false);
                scenicSpot.setScenicSpots(data.slice(0, slice));
            })
            .catch((err) => {
                console.error(err);
                setIsNotFound(true);
                setIsSearching(false);
                setHaveNextPage(false);
                scenicSpot.setScenicSpots([]);
            })
    }

    useEffect(() => {
        searchScenicSpots(1);
        scenicSpot.setSkip(0);
    }, [scenicSpotClass])


    // URL page 參數更新的時候 -> 更新當前頁面 state
    useEffect(() => {
        if (enablePageChange) {
            let page = parseInt(new URLSearchParams(location.search).get('page'));
            setCurrentPage(page);
        }
    }, [location.search])


    // 當前頁面 state 更新的時候 -> 更新 scenicSpot 資料
    useEffect(() => {
        setIsSearching(true);
        searchScenicSpots(currentPage);
    }, [currentPage])


    //尚未決定要如何處理換頁
    const handleNextPageBtnClick = () => { }
    //尚未決定要如何處理換頁
    const handlePreviousPageBtnClick = () => { }

    return (
        <Container>
            <SmallCardRow
                show={show}
                title={title ? title : "活動"}
                list={scenicSpot.scenicSpots}
                logo={"rectangle"}
                isSearching={isSearching}
                isNotFound={isNotFound}
                category={category}
            />
            {enablePageChange &&
                <ChangePageFooter
                    currentPage={currentPage}
                    handleNextPageBtnClick={handleNextPageBtnClick}
                    handlePreviousPageBtnClick={handlePreviousPageBtnClick}
                    haveNextPage={false}
                    havePreviousPage={false}
                />
            }
        </Container>
    )
}


export {
    ScenicSpotsResultByPosition,
    ScenicSpotsResultBySearch,
    ScenicSpotsResultByClass
}
