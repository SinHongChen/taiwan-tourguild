import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Searchbar, Select, SearchButton, GpsButton } from "components/hub/BasicComponents";
import { useHistory, useLocation } from "react-router-dom"
import { cityMenu, categoryMenu } from "helpers/menu";
import { device } from "components/layout/device";


const Container = styled.form`
    z-index:var(--general-searchbar-index);
    width: 100%;
    background-color: none;
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${device.desktop}{
        position: absolute;
        top: var(--desktop-navbar-height);
        height: var(--desktop-banner-height);
    }

    @media ${device.tablet}{
        height: var(--tablet-general-searchbar-height);
        background-color: var(--bg-color-2);
    }

    @media ${device.mobile}{
        height: var(--mobile-general-searchbar-height);
        background-color: var(--bg-color-2);
    }
    
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 9px;
    height: fit-content;
    width: fit-content;

    @media ${device.mobile}{
        width:100%;
    }
`


const Logo = styled.img`
    height: 50px;
    @media ${device.desktop}{
        display: block;
    }

    @media ${device.tablet}{
        display: none;
    }

    @media ${device.mobile}{
        display: none;
    }
`

const Label = styled.label`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #FFFFFF;
    @media ${device.desktop}{
        display: block;
    }

    @media ${device.tablet}{
        display: none;
    }

    @media ${device.mobile}{
        display: none;
    }
`

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    @media ${device.mobile}{
        width: 90%;
        margin:0 auto;
    }
`


const GeneralSearchbar = () => {
    let history = useHistory();

    const [searchParams, setSearchParams] = useState({
        city: "",
        category: categoryMenu[0].value,
        keyword: cityMenu[0].value
    });

    const updateSearchParams = (data) => {
        setSearchParams({ ...searchParams, ...data })
    }

    const handleSearchBtn = (event) => {
        event.preventDefault();
        history.push(`/searchResult?city=${searchParams.city}&category=${searchParams.category}&keyword=${searchParams.keyword}&page=1`);
    }

    const handleGpsBtn = (event) => {
        event.preventDefault();
        history.push("/gps")
    }

    return (
        <Container>
            <Content>
                <Logo src="./generateSearchbarLogo.png" />
                <Label>台北、台中、台南、屏東、宜蘭……遊遍台灣
                </Label>
                <Row>
                    <Searchbar onChange={(event) => {
                        updateSearchParams({ keyword: event.target.value })
                    }} value={searchParams.keyword} />
                    <SearchButton onClick={handleSearchBtn} />
                </Row>
                <Row>
                    <Select onChange={(value) => {
                        updateSearchParams({ category: value })
                    }}
                        list={categoryMenu}
                        defaultItem={categoryMenu[0]}
                    />

                    <Select onChange={(value) => {
                        updateSearchParams({ city: value })
                    }}
                        list={cityMenu}
                        defaultItem={cityMenu[0]}
                    />
                    <GpsButton onClick={handleGpsBtn} />
                </Row>
            </Content>
        </Container>
    )
}

export default GeneralSearchbar