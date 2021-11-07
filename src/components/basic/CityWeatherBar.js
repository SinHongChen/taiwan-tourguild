import React, { useEffect, useState } from 'react';
import {
    Sun,
    Dark,
    Drizzle,
    Thundershower,
    Heavy,
    Umbrella,
    Cloud
} from 'components/basic/WeatherIcons';
import { fetchWeatherByCityName } from 'api/fetchWeather';
import dayjs from 'dayjs';
import styled from 'styled-components';


const Container = styled.div`
    width: fit-content;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CityWeatherBar = ({ locationName, timeFrom, timeTo, className }) => {
    const [showValues, setShowValues] = useState(
        {
            City: "",
            MaxT: 0,
            MinT: 0,
            PoP: 0,
            Wx: 0
        }
    )

    const weatherType = {
        "sun": <Sun />,
        "dark": <Dark />,
        "cloud": <Cloud />,
        "heavy": <Heavy />,
        "drizzle": <Drizzle />,
        "thundershower": <Thundershower />,
    }

    const getCurrentLocationWeather = (locationName) => {
        let CurrentTime = new Date();
        const timeFrom = dayjs(CurrentTime.toISOString()).format('YYYY-MM-DDTHH:mm:ss');
        CurrentTime.setHours(CurrentTime.getHours() + 1);
        const timeTo = dayjs(CurrentTime.toISOString()).format('YYYY-MM-DDTHH:mm:ss');
        fetchWeatherByCityName(locationName, timeFrom, timeTo)
            .then((response) => {
                if (response.data.records.location.length > 0) {
                    initWeatherValues(locationName, response.data.records.location[0].weatherElement);
                }
            })
    }

    const initWeatherValues = (city, weatherData) => {
        console.info("initWeatherValues()")
        console.table(weatherData)
        let weatherValues = {
            City: city,
            MaxT: weatherData[4].time[0].parameter.parameterName,
            MinT: weatherData[2].time[0].parameter.parameterName,
            PoP: weatherData[1].time[0].parameter.parameterName,
            Wx: weatherData[0].time[0].parameter.parameterValue,
        }
        setShowValues(weatherValues)
    }

    useEffect(() => {
        console.info("showValues")
        console.table(showValues)
    }, [showValues])

    useEffect(() => {
        getCurrentLocationWeather(locationName)
    }, [locationName])


    return (
        <Container className={className}>
            <span>{showValues.City}&nbsp;&nbsp;</span>
            <span>{`${showValues.MinT} ~ ${showValues.MaxT}°C`}&nbsp;&nbsp;</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Umbrella />
            <span>&nbsp;{showValues.PoP}%</span>
        </Container>
    )
}

export default CityWeatherBar
