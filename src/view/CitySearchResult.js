import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import { device } from "components/layout/device";
import { ResultBySearch } from 'components/result/Results';
import CityWeatherBar from 'components/basic/CityWeatherBar';
import { cityMenu, getCityNameByValue, getCityIndexByValue } from 'helpers/menu';
import TriangleLogo from 'components/basic/TriangleLogo';
import { ActivityResultBySearch } from 'components/result/ActivityResult';
import { HotelsResultBySearch } from 'components/result/HotelsResult';
import { ScenicSpotsResultBySearch } from 'components/result/ScenicSpotsResult';
import { RestaurantsResultBySearch } from 'components/result/RestaurantsResult';
import { CityCardRow } from 'components/hub/CarRows';

//#region styled component

const Container = styled.div`
    width: 94%;
    margin: 40px auto;
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

const CitySearchResult = () => {
    const location = useLocation();
    const [city, setCity] = useState();
    const [keyword, setKeyword] = useState();
    const slice = 10;

    useEffect(() => {
        setCity(new URLSearchParams(location.search).get('city'))
        setKeyword(new URLSearchParams(location.search).get('keyword'))
    }, [location.search])

    return (
        <Container>
            <CityCardRow
                title={"城市探索"}
                list={cityMenu.slice(1)}
                logo={"triangle"}
            />
            {getCityIndexByValue(city) !== 0 &&
                <CityHeader>
                    <TriangleLogo show={true} />
                    <CityWeatherBar locationName={getCityNameByValue(city)} />
                </CityHeader>
            }
            <RestaurantsResultBySearch
                show={true}
                city={city}
                keyword={keyword}
                slice={slice}
                title={"推薦美食"}
                category={"restaurant"}
                enablePageChange={false}
            />
            <HotelsResultBySearch
                show={true}
                city={city}
                keyword={keyword}
                slice={slice}
                title={"推薦住宿"}
                category={""}
                enablePageChange={false}
            />
            <ActivityResultBySearch
                show={true}
                city={city}
                keyword={keyword}
                slice={slice}
                title={"推薦活動"}
                category={"activity"}
                enablePageChange={false}
            />
            <ScenicSpotsResultBySearch
                show={true}
                city={city}
                keyword={keyword}
                slice={slice}
                title={"推薦景點"}
                category={"scenicSpot"}
                enablePageChange={false}
            />
        </Container>
    )
}

export default CitySearchResult
