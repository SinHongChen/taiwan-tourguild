import {
    fetchActivityByKeyword,
    fetchActivitysByPosition,
    fetchActivityById,
    fetchActivityByClass,
    fetchHealth
} from "api/fetchActivity";
import React, { useState } from 'react';
import fakeData from "fakeResponse/Activity.json";

const useActivity = () => {
    const [activityInfos, setActivityInfos] = useState([]);
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
     * 透過 id 取得 activityInfo 資料
     * @param {*} city 指定縣市 
     */
    const getActivityInfoById = (id) => {
        return new Promise((resolve, reject) => {
            fetchActivityById(id)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
     * 透過 class 取得 activityInfos 資料
     * @param {*} activityClass 
     * @param {*} top 
     * @param {*} skip 
     * @returns 
     */
    const getActivityInfosByClass = (activityClass, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchActivityByClass(activityClass, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
     * 透過搜尋條件取得 activityInfos 資料
     * @param {*} city 指定縣市 
     * @param {*} keyword 關鍵字
     * @param {*} top 筆數
     * @param {*} skip 跳過幾筆
     */
    const getActivityInfosBySearch = (city, keyword, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchActivityByKeyword(city, keyword, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
     * 透過座標取得 activityInfos 資料
     * @param {*} lat 
     * @param {*} lon 
     * @param {*} distance 
     * @param {*} top 
     * @param {*} skip 跳過幾筆
     */
    const getActivityInfosByPosition = (lat, lon, distance, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchActivitysByPosition(lat, lon, distance, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }


    return {
        activityInfos,
        skip,
        setSkip,
        top,
        setTop,
        isApiHealth,
        setActivityInfos,
        getActivityInfosBySearch,
        getActivityInfosByPosition,
        getActivityInfoById,
        getActivityInfosByClass
    }
}

export default useActivity
