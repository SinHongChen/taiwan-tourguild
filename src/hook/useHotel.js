import {
    fetchHotelsByKeyword,
    fetchHotelsByPosition,
    fetchHotelById,
    fetchHotelByClass,
    fetchHealth
} from "api/fetchHotel";
import React, { useState } from 'react'

const useHotel = () => {

    const [hotels, setHotels] = useState([]);
    const [skip, setSkip] = useState(0);
    const [top, setTop] = useState(10);

    /**
     * 確認 API 是否健康
     */
    const isApiHealth = () => {
        return new Promise((resolve, reject) => {
            fetchHealth()
                .then((data) => {
                    if (data.Inbound.Status && data.Outbound.Status) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }


    /**
     * 透過 id 取得 hotel 資料
     * @param {*} id 指定縣市 
     */
    const getHotelById = (id) => {
        return new Promise((resolve, reject) => {
            fetchHotelById(id)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
    * 透過 class 取得 hotels 資料
    * @param {*} hotelClass 
    * @param {*} top 
    * @param {*} skip 
    * @returns 
    */
    const getHotelsByClass = (hotelClass, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchHotelByClass(hotelClass, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }


    /**
     * 透過搜尋條件設定 hotels 資料
     * @param {*} city 指定縣市 
     * @param {*} keyword 關鍵字
     * @param {*} top 筆數
     * @param {*} skip 跳過幾筆
     */
    const getHotelsByKeywordAndCity = (city, keyword, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchHotelsByKeyword(city, keyword, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
     * 透過座標設定 hotels 資料
     * @param {*} lat 
     * @param {*} lon 
     * @param {*} distance 
     * @param {*} top 
     * @param {*} skip 跳過幾筆
     */
    const getHotelsByPosition = (lat, lon, distance, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchHotelsByPosition(lat, lon, distance, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    return {
        hotels,
        skip,
        setSkip,
        top,
        setTop,
        isApiHealth,
        setHotels,
        getHotelsByPosition,
        getHotelsByKeywordAndCity,
        getHotelById,
        getHotelsByClass
    }
}

export default useHotel
