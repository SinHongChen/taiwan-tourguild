import {
    fetchRestaurantsByKeyword,
    fetchRestaurantsByPosition,
    fetchRestaurantById,
    fetchRestaurantByClass,
    fetchHealth
} from "api/fetchRestaurant";
import React, { useEffect, useState } from 'react';
import fakeData from "fakeResponse/Restaurant.json";

const useRestaurant = () => {

    const [restaurants, setRestaurants] = useState([]);
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
     * 透過 id 取得 restaurant 資料
     * @param {*} id 
     */
    const getRestaurantById = (id) => {
        return new Promise((resolve, reject) => {
            fetchRestaurantById(id)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
    * 透過 class 取得 Restaurants 資料
    * @param {*} restaurantClass 
    * @param {*} top 
    * @param {*} skip 
    * @returns 
    */
    const getRestaurantsByClass = (restaurantClass, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchRestaurantByClass(restaurantClass, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
     * 透過搜尋條件取得 restaurants 資料
     * @param {*} city 指定縣市 
     * @param {*} keyword 關鍵字
     * @param {*} top 筆數
     * @param {*} skip 跳過幾筆
     */
    const getRestaurantsBySearch = (city, keyword, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchRestaurantsByKeyword(city, keyword, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }

    /**
     * 透過座標取得 restaurants 資料
     * @param {*} lat 
     * @param {*} lon 
     * @param {*} distance 
     * @param {*} top 
     * @param {*} skip 跳過幾筆
     */
    const getRestaurantsByPosition = (lat, lon, distance, top = 10, skip = 0) => {
        return new Promise((resolve, reject) => {
            fetchRestaurantsByPosition(lat, lon, distance, top, skip)
                .then((data) => {
                    resolve(data)
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }



    return {
        isApiHealth,
        restaurants,
        setRestaurants,
        setSkip,
        skip,
        setTop,
        top,
        getRestaurantsByPosition,
        getRestaurantsBySearch,
        getRestaurantById,
        getRestaurantsByClass
    }
}

export default useRestaurant
