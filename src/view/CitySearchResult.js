import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import { deviceMedia } from "helpers/device";
import CityWeatherBar from 'components/basic/CityWeatherBar';
import { categoryMenu, getCityNameByValue, getCityIndexByValue, cityMenu } from 'helpers/menu';
import TriangleLogo from 'components/basic/TriangleLogo';
import ResultBySearch from 'components/result/ResultBySearch';
import CityLinkRow from 'components/rows/CityLinkRow';
import { More } from 'components/basic/SmallIcons';

//#region styled component

const Container = styled.div`
    width: 94%;
    margin: 0px auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;

    @media ${deviceMedia.desktop}{
        padding: 60px 0px;
    }

    @media ${deviceMedia.tablet}{
        padding: 60px 0 40px 0px;
    }

    @media ${deviceMedia.mobile}{
        padding: 60px 0px;
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

    @media ${deviceMedia.desktop}{
        font-size: 20px; 
    }

    @media ${deviceMedia.tablet}{
        font-size: 20px;
    }

    @media ${deviceMedia.mobile}{
        font-size: 18px;
    }
`

const MoreCityCollapseBtn = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
`

//#endregion


//TODO:搜尋的結果比設定的筆數多出一筆,目前推測試 slice 跟 limit 的參數沒有設置好

const CitySearchResult = () => {
    const location = useLocation();
    const [city, setCity] = useState();
    const [keyword, setKeyword] = useState();
    const slice = 8;
    const [searchParams, setSearchParams] = useState({
        category: "",
        city: "",
        keyword: "",
        page: 1
    })
    useEffect(() => {
        setSearchParams({
            category: "",
            city: new URLSearchParams(location.search).get('city'),
            keyword: "",
            page: 1
        })
    }, [location.search])

    return (
        <Container>
            <CityLinkRow cityMenu={cityMenu.slice(1)} />
            {getCityIndexByValue(city) !== 0 &&
                <CityHeader>
                    <TriangleLogo show={true} />
                    <CityWeatherBar locationName={getCityNameByValue(city)} />
                </CityHeader>
            }
            {categoryMenu.map((category) => {
                return (<ResultBySearch
                    title={`推薦${category.name}`}
                    slice={slice}
                    isShow={true}
                    canChangePage={false}
                    searchParams={{ ...searchParams, category: category.value }}
                />)
            })}
        </Container>
    )
}

export default CitySearchResult
