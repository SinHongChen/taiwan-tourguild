import {
    fetchScenicSpotsByKeyword,
    fetchScenicSpotsByPosition,
    fetchScenicSpotById,
    fetchScenicSpotByClass,
    fetchHealth
} from "api/fetchScenicSpot";
import React, { useState } from 'react'
import fakeData from "fakeResponse/ScenicSpot.json";

const useScenicSpot = () => {

    const [scenicSpots, setScenicSpots] = useState([]);
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
     * 透過 id 取得 scenicSpot 資料
     * @param {*} id  
     */
    const getScenicSpotById = (id) => {
        return new Promise((resolve, reject) => {
            fetchScenicSpotById(id)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /**
    * 透過 class 取得 ScenicSpots 資料
    * @param {*} scenicSpotClass 
    * @param {*} top 
    * @param {*} skip 
    * @returns 
    */
    const getScenicSpotsByClass = (scenicSpotClass, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchScenicSpotByClass(scenicSpotClass, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }


    /**
     * 透過搜尋條件取得 scenicSpots 資料
     * @param {*} city 指定縣市 
     * @param {*} keyword 關鍵字
     * @param {*} top 筆數
     * @param {*} skip 跳過幾筆
     */
    const getScenicSpotsBySearch = (city, keyword, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchScenicSpotsByKeyword(city, keyword, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /**
     * 透過座標取得 scenicSpots 資料
     * @param {*} lat 
     * @param {*} lon 
     * @param {*} distance 
     * @param {*} top 
     * @param {*} skip 跳過幾筆
     */
    const getScenicSpotsByPosition = (lat, lon, distance, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchScenicSpotsByPosition(lat, lon, distance, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }


    return {
        scenicSpots,
        skip,
        setSkip,
        top,
        setTop,
        isApiHealth,
        setScenicSpots,
        getScenicSpotsBySearch,
        getScenicSpotsByPosition,
        getScenicSpotById,
        getScenicSpotsByClass
    }
}

export default useScenicSpot
