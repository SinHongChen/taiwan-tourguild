import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'components/basic/Select';
import { SearchButton } from 'components/basic/SmallButton';
import { useHistory } from "react-router-dom"
import { cityMenu, categoryMenu } from "helpers/menu";
import { deviceMedia } from "helpers/device";

const Container = styled.form`
    z-index:var(--general-searchbar-index);
    width: 100%;
    background-color: var(--bg-color-2);
    display: flex;
    align-items: center;
    justify-content: center;

    @media ${deviceMedia.desktop}{
        height: var(--desktop-bus-searchbar-height);
    }

    @media ${deviceMedia.tablet}{
        height: var(--tablet-bus-searchbar-height);
    }

    @media ${deviceMedia.mobile}{
        height: var(--mobile-bus-searchbar-height);
        top:var(--mobile-navbar-height);
        background-color: var(--bg-color-2);
    }
    
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 9px;
    height: fit-content;
    width: fit-content;

    @media ${deviceMedia.desktop}{
        width:800px;
    }

    @media ${deviceMedia.tablet}{
        width:600px;
    }

    @media ${deviceMedia.mobile}{
        width:100%;
    }
`


const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    @media ${deviceMedia.mobile}{
        width: 90%;
        margin:0 auto;
    }
`


const BusSearchbar = () => {
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
        history.push(`/searchResult?city=${searchParams.city}&category=${searchParams.category}&keyword=${searchParams.keyword}`);
    }

    const handleGpsBtn = (event) => {
        event.preventDefault();
    }

    return (
        <Container>
            <Content>
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
                    <SearchButton onClick={handleSearchBtn} />
                </Row>
            </Content>
        </Container>
    )
}

export default BusSearchbar