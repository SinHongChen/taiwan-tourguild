import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import { device } from "components/layout/device";
import { ResultBySearch } from 'components/result/Results';
import CityWeatherBar from 'components/basic/CityWeatherBar';
import { cityMenu, getCityNameByValue, getCityIndexByValue } from 'helpers/menu';
import TriangleLogo from 'components/basic/TriangleLogo';
//#region styled component

const Container = styled.div`
    width: 94%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;

    @media ${device.desktop}{
        padding: 40px 0px;
    }

    @media ${device.tablet}{
        padding: 20px 0 40px 0px;
    }

    @media ${device.mobile}{
        padding: 40px 0px;
    }
`

const CityHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    color: var(--text-color-1);

    @media ${device.desktop}{
        font-size: 20px; 
    }

    @media ${device.tablet}{
        font-size: 20px;
    }

    @media ${device.mobile}{
        font-size: 18px;
    }
`

const CityTitle = styled.div`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    color: var(--text-color-1);
    display: flex;
    align-items: center;
    height: fit-content;
    @media ${device.desktop}{
        font-size: 20px; 
    }

    @media ${device.tablet}{
        font-size: 20px;
    }

    @media ${device.mobile}{
        font-size: 18px;
    }
`

//#endregion


//TODO:搜尋的結果比設定的筆數多出一筆,目前推測試 slice 跟 limit 的參數沒有設置好

const SearchResult = () => {
    const location = useLocation();
    const [category, setCategory] = useState();
    const [city, setCity] = useState();
    const [keyword, setKeyword] = useState();
    const slice = 40;

    useEffect(() => {
        setCategory(new URLSearchParams(location.search).get('category'))
        setCity(new URLSearchParams(location.search).get('city'))
        setKeyword(new URLSearchParams(location.search).get('keyword'))
    }, [location.search])

    return (
        <Container>
            {getCityIndexByValue(city) !== 0 &&
                <CityHeader>
                    <TriangleLogo show={true} />
                    <CityWeatherBar locationName={getCityNameByValue(city)} />
                </CityHeader>
            }
            <ResultBySearch
                category={category}
                city={city}
                keyword={keyword}
                slice={slice}
                enablePageChange={true}
            />
        </Container>
    )
}

export default SearchResult
