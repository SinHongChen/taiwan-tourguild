import { weatherApiURL, getInstance, openWeatherDataAuthorization } from "./axios";

const axios = getInstance(weatherApiURL, {});

const fetchWeatherByCityName = async (cityName, timeFrom, timeTo) => {
    let encodeTimeFrom = escape(timeFrom);
    let encodeTimeTo = escape(timeTo);
    const response = await axios.get(`${weatherApiURL}/v1/rest/datastore/F-C0032-001`, {
        params: {
            Authorization: openWeatherDataAuthorization,
            locationName: cityName,
            timeFrom: encodeTimeFrom,
            timeTo: encodeTimeTo
        }
    })
    return response;
}

export {
    fetchWeatherByCityName
}

