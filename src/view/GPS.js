import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCoord, setGpsEnable, selectCoord } from "slice/positionSlice";
import styled from 'styled-components';
import { Font1 } from 'components/styled/Font';
import { GPS as GpsAnimation, Loading as LoadingAnimation } from 'components/animation/Animations';

//#region styled component

const BigGpsAnimation = styled(GpsAnimation)`
    width: 200px;
    height: 200px;
`


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--bg-color-1);
    padding: 50px 0;
`

const Btn = styled.button`
    border: none;
    outline: none;
    box-shadow: 1px 1px 5px var(--box-shadow-color-2);
    padding:10px 15px;
    width: 80%;
    max-width: 300px;
    background-color: var(--bg-color-1);
    ${Font1}
    font-size: 14px;
    border-radius: 0.2em;
    margin-bottom: 20px;

    &:hover{
        cursor: pointer;
    }
`

const InfoBar = styled.h4`
    ${Font1}
    margin-bottom: 30px;
`

//#endregion

const GPS = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const coord = useSelector(selectCoord);

    function requestGPS() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updateCurrentPosition, getPositionError);
        } else {
        }
    }

    const updateCurrentPosition = (position) => {
        let coord = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        };
        dispatch(setGpsEnable(true));
        dispatch(setCoord(coord));
        history.push("/positionResult")
    }

    const getPositionError = (error) => {
        alert("GPS開啟失敗,請確認是否封鎖網站定位")
    }


    return (
        <Container>
            <BigGpsAnimation />
            {coord === null ?
                <>
                    <InfoBar>
                        請開啟定位享有完整的使用體驗!
                    </InfoBar>
                    <Btn
                        style={{ color: "var(--text-color-1)" }}
                        onClick={requestGPS}
                    >
                        開啟定位
                    </Btn>
                </> :
                <>
                    <InfoBar>
                        已開啟定位
                    </InfoBar>
                    <InfoBar>
                        latitude {coord.lat}
                    </InfoBar>
                    <InfoBar>
                        longitude {coord.lon}
                    </InfoBar>
                </>
            }
        </Container >
    )
}

export default GPS
