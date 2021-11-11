import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import { deviceMedia } from "helpers/device";
import ResultBySearch from 'components/result/ResultBySearch';
import CityWeatherBar from 'components/basic/CityWeatherBar';
import { getCityNameByValue, getCityIndexByValue, getCategoryNameByValue } from 'helpers/menu';
import TriangleLogo from 'components/basic/TriangleLogo';
//#region styled component

const Container = styled.div`
    width: 94%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;

    @media ${deviceMedia.desktop}{
        padding: 60px 0px;
    }

    @media ${deviceMedia.tablet}{
        padding: 40px 0 40px 0px;
    }

    @media ${deviceMedia.mobile}{
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
    margin-top: 20px;
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

//#endregion


//TODO:搜尋的結果比設定的筆數多出一筆,目前推測試 slice 跟 limit 的參數沒有設置好

const SearchResult = () => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useState({
        category: "",
        city: "",
        keyword: "",
        page: 1
    })
    const slice = 40;

    useEffect(() => {
        setSearchParams({
            category: new URLSearchParams(location.search).get('category'),
            city: new URLSearchParams(location.search).get('city'),
            keyword: new URLSearchParams(location.search).get('keyword'),
            page: parseInt(new URLSearchParams(location.search).get('page'))
        })
    }, [location.search])

    return (
        <Container>
            {getCityIndexByValue(searchParams.city) !== 0 &&
                <CityHeader>
                    <TriangleLogo show={true} />
                    <CityWeatherBar locationName={getCityNameByValue(searchParams.city)} />
                </CityHeader>
            }
            <ResultBySearch
                title={getCategoryNameByValue(searchParams.category)}
                isShow={true}
                slice={slice}
                canChangePage={true}
                searchParams={searchParams}
            />
        </Container>
    )
}

export default SearchResult
