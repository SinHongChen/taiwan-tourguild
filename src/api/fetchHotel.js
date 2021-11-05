import { getInstance, tdxApiUrl, getTDXAuthorizationHeader } from "./axios";

const axios = getInstance(tdxApiUrl, getTDXAuthorizationHeader());

const fetchHealth = () => {
    return new Promise((resolve, reject) => {
        axios.get("/Hotel?health=true&$format=JSON")
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
 * @param {*} hotelClass 
 * @param {*} top 
 * @param {*} skip 
 * @returns 
 */
const fetchHotelByClass = (hotelClass, top, skip) => {
    const params = { $filter: `Class eq '${hotelClass}'`, $format: "JSON", $top: top, $skip: skip }
    return new Promise((resolve, reject) => {
        axios.get("/Hotel", { params })
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
const fetchHotelById = (id) => {
    const params = { $filter: `ID eq '${id}'`, $format: "JSON" }
    return new Promise((resolve, reject) => {
        axios.get("/Hotel", { params })
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
 * @param {*} callback 
 */
const fetchHotelsByKeyword = (city, keyword, top, skip, callback) => {
    const params = { $filter: `contains(Name,'${keyword}')`, $top: top, $skip: skip, $format: "JSON" }
    const url = city === "" ? "/Hotel" : `/Hotel/${city}`;
    return new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error)
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
 * @param {*} callback 
 */
const fetchHotelsByPosition = (lat, lon, distance, top, skip, callback) => {
    const params = { $top: top, $skip: skip, $format: "JSON", $spatialFilter: `nearby(${lat},${lon},${distance})` }
    return new Promise((resolve, reject) => {
        axios.get("/Hotel", { params })
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
    fetchHotelsByPosition,
    fetchHotelsByKeyword,
    fetchHotelById,
    fetchHotelByClass
}