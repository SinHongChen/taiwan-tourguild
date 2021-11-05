import axios from "axios";
import jsSHA from "jssha";

const tdxApiUrl = "https://ptx.transportdata.tw/MOTC/v2/Tourism";
const weatherApiURL = "https://opendata.cwb.gov.tw/api";
const geocodeApiURL = "https://api.opencagedata.com/geocode";

const openWeatherDataAuthorization = "CWB-300BC6DE-F158-464E-B006-80C5F0BEF6CD";
const geocodeApiKey = "6ee097e24e60445189e119a9559cf3d7"

const getInstance = (uri, header, responseType = "json") => {
    const instance = axios.create({
        baseURL: uri,
        responseType: responseType,
        headers: header
    });
    return instance;
}

function Params() {
    this.$select = ""
    this.$filter = ""
    this.$orderby = ""
    this.$top = ""
    this.$skip = ""
    this.$spatialFilter = ""
}

function getTDXAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = '50febce988af4929890cd5aa94708237';
    let AppKey = 'KayJYB0zQyRe2sYeRD9vVDyHrgU';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    //let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
    let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

    return { 'Authorization': Authorization, 'X-Date': GMTString, 'Content-Type': 'application/json' };
}

export {
    Params,
    getInstance,
    getTDXAuthorizationHeader,
    openWeatherDataAuthorization,
    geocodeApiKey,
    tdxApiUrl,
    weatherApiURL,
    geocodeApiURL
}
