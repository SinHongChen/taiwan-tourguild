import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from 'components/header/Header';
import Footer from '../footer/Footer';
import Banner from 'components/header/Banner';
import BusSearchbar from 'components/header/BusSearchbar';
import GeneralSearchbar from 'components/header/GeneralSearchbar';
import Navbar from 'components/header/Navbar';
import BusRoute from 'components/header/BusRoute';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectGpsEnable } from "slice/positionSlice";
import { device } from "components/layout/device";
import { useState } from 'react';


//#region styled component

const Container = styled.div`
    background-color: var(--bg-color-1);
`

const Main = styled.div`
    overflow: hidden;
    width: 90%;
    max-width: 1700px;
    margin:0 auto;
    height: fit-content;
    
    @media ${device.desktop} {
        min-height: calc(100vh - var(--desktop-footer-height) - 550px);
    }

    @media ${device.tablet} {
        min-height: calc(100vh - var(--tablet-footer-height) - 214px);
    }

    @media ${device.mobile} {
        min-height: calc(100vh - var(--mobile-footer-height) - 240px);
    }
`

//#endregion

const BasicLayout = ({ children }) => {
    const { pathname } = useLocation();
    const history = useHistory();
    const gpsEnabled = useSelector(selectGpsEnable);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
    }, [])

    return (
        <Container data-theme={darkMode ? "dark" : "light"}>
            <Header>
                <Navbar />
                {pathname === "/bus" ?
                    <>
                        <BusSearchbar />
                        <BusRoute />
                    </>
                    :
                    <>
                        <Banner />
                        <GeneralSearchbar />
                    </>
                }

            </Header>
            <Main>
                {children}
            </Main>
            <Footer setDarkMode={setDarkMode} />
        </Container>
    )
}

export default BasicLayout
