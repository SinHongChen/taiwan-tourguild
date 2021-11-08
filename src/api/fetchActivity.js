import { getInstance, tdxApiUrl, getTDXAuthorizationHeader } from "./axios";

const axios = getInstance(tdxApiUrl, getTDXAuthorizationHeader());

const fetchHealth = () => {
    return new Promise((resolve, reject) => {
        axios.get("/Activity?health=true&$format=JSON")
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


/**
 * 透過ID取得資料
 * @param {*} id
 */
const fetchActivityById = (id) => {
    const params = { $filter: `ID eq '${id}'`, $format: "JSON" }
    return new Promise((resolve, reject) => {
        axios.get("/Activity", { params })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


/**
 * 透過類型拿取資料
 * @param {*} activityClass 
 * @param {*} top 
 * @param {*} skip 
 * @returns 
 */
const fetchActivityByClass = (activityClass, top, skip) => {
    const params = { $filter: `Class1 eq '${activityClass}'`, $format: "JSON", $top: top, $skip: skip }
    return new Promise((resolve, reject) => {
        axios.get("/Activity", { params })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}


/**
 * 透過關鍵字取得資料
 * @param {*} city 城市
 * @param {*} keyword 關鍵字
 * @param {*} top 筆數
 * @param {*} skip 跳過幾筆
 */
const fetchActivityByKeyword = (city, keyword, top, skip) => {
    const params = { $top: top, $skip: skip, $format: "JSON", $filter: `contains(Name,'${keyword}')` }
    const url = city === "" ? "/Activity" : `/Activity/${city}`;
    return new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

/**
 * 透過座標取得資料
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} distance 
 * @param {*} top 
 * @param {*} skip 跳過幾筆
 */
const fetchActivitysByPosition = (lat, lon, distance, top, skip) => {
    const params = { $top: top, $skip: skip, $format: "JSON", $spatialFilter: `nearby(${lat},${lon},${distance})` }
    return new Promise((resolve, reject) => {
        axios.get("/Activity", { params })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export {
    fetchHealth,
    fetchActivitysByPosition,
    fetchActivityByKeyword,
    fetchActivityById,
    fetchActivityByClass
}