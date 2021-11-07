import React, { useEffect } from 'react'
import { SmallCardRow } from 'components/hub/CarRows';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ChangePageFooter from './ChangePageFooter';
import useHotel from 'hook/useHotel';


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

const HotelsResultBySearch = ({
    slice,
    show,
    city,
    keyword,
    category,
    title,
    enablePageChange
}) => {
    const hotel = useHotel();
    const history = useHistory();
    const location = useLocation();
    const sliceExtraNumber = slice + 1;
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get('page')));

    const searchHotels = (page) => {
        let skip = (page - 1) * slice;
        hotel.setSkip(skip);
        hotel.getHotelsBySearch(city, keyword, sliceExtraNumber, skip)
            .then((data) => {
                setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
                setIsNotFound(checkIsNotFound(data));
                setIsSearching(false);
                hotel.setHotels(data.slice(0, slice));
            })
            .catch((err) => {
                console.error(err);
                setIsNotFound(true);
                setIsSearching(false);
                setHaveNextPage(false);
                hotel.setHotels([]);
            })
    }

    useEffect(() => {
        searchHotels(1);
        hotel.setSkip(0);
    }, [city, keyword])


    // URL page 參數更新的時候 -> 更新當前頁面 state
    useEffect(() => {
        if (enablePageChange) {
            let page = parseInt(new URLSearchParams(location.search).get('page'));
            setCurrentPage(page);
        }
    }, [location.search])


    // 當前頁面 state 更新的時候 -> 更新 hotel 資料
    useEffect(() => {
        setIsSearching(true);
        searchHotels(currentPage);
    }, [currentPage])


    const handleNextPageBtnClick = () => {
        if (haveNextPage) {
            history.push(`/searchResult?city=${city}&category=${category}&keyword=${keyword}&page=${currentPage + 1}`);
        }
    }

    const handlePreviousPageBtnClick = () => {
        if (currentPage > 1) {
            history.push(`/searchResult?city=${city}&category=${category}&keyword=${keyword}&page=${currentPage - 1}`);
        }
    }

    return (
        <Container>
            <SmallCardRow
                show={show}
                title={title ? title : "住宿"}
                list={hotel.hotels}
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

const HotelsResultByPosition = ({
    slice,
    show,
    lat,
    lon,
    distance,
    category,
    title,
    enablePageChange
}) => {
    const hotel = useHotel();
    const sliceExtraNumber = slice + 1;
    const location = useLocation();
    const history = useHistory();
    const [isNotFound, setIsNotFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get('page')));

    const checkHaveCoord = (lat, lon) => {
        return lat && lon;
    }

    const searchHotels = (page) => {
        let skip = (page - 1) * slice;
        hotel.setSkip(skip);
        hotel.getHotelsByPosition(lat, lon, distance, sliceExtraNumber, skip)
            .then((data) => {
                setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
                setIsNotFound(checkIsNotFound(data));
                setIsSearching(false);
                hotel.setHotels(data.slice(0, slice));
            })
            .catch((err) => {
                console.error(err);
                setIsNotFound(true);
                setIsSearching(false);
                setHaveNextPage(false);
                hotel.setHotels([]);
            })
    }


    useEffect(() => {
        if (checkHaveCoord(lat, lon)) {
            searchHotels(1);
            hotel.setSkip(0);
        }
    }, [lat, lon, distance]);

    // URL page 參數更新的時候 -> 更新當前頁面 state
    useEffect(() => {
        if (enablePageChange) {
            let page = parseInt(new URLSearchParams(location.search).get('page'));
            setCurrentPage(page);
        }
    }, [location.search])


    // 當前頁面 state 更新的時候 -> 更新 hotel 資料
    useEffect(() => {
        setIsSearching(true);
        searchHotels(currentPage);
    }, [currentPage])


    const handlePageChange = () => {
        history.push(`/positionResult?page=${currentPage + 1}`);
    }


    return (
        <Container>
            <SmallCardRow
                show={show}
                title={title ? title : "美食"}
                list={hotel.hotels}
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


const HotelsResultByClass = ({
    slice,
    show,
    hotelClass,
    category,
    title,
    enablePageChange
}) => {
    const hotel = useHotel();
    const location = useLocation();
    const sliceExtraNumber = slice + 1;
    const [haveNextPage, setHaveNextPage] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(parseInt(new URLSearchParams(location.search).get('page')));


    const searchhotelInfos = (page) => {
        let skip = (page - 1) * slice;
        hotel.setSkip(skip);
        hotel.getHotelsByClass(hotelClass, sliceExtraNumber, skip)
            .then((data) => {
                setHaveNextPage(checkHaveNextPage(data, sliceExtraNumber));
                setIsNotFound(checkIsNotFound(data));
                setIsSearching(false);
                hotel.setHotels(data.slice(0, slice));
            })
            .catch((err) => {
                console.error(err);
                setIsNotFound(true);
                setIsSearching(false);
                setHaveNextPage(false);
                hotel.setHotels([]);
            })
    }

    useEffect(() => {
        searchhotelInfos(1);
        hotel.setSkip(0);
    }, [hotelClass])


    // URL page 參數更新的時候 -> 更新當前頁面 state
    useEffect(() => {
        if (enablePageChange) {
            let page = parseInt(new URLSearchParams(location.search).get('page'));
            setCurrentPage(page);
        }
    }, [location.search])


    // 當前頁面 state 更新的時候 -> 更新 hotel 資料
    useEffect(() => {
        setIsSearching(true);
        searchhotelInfos(currentPage);
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
                list={hotel.hotels}
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
    HotelsResultByPosition,
    HotelsResultBySearch,
    HotelsResultByClass
}
