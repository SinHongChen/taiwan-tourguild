import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { device } from "components/layout/device";
import PropTypes from "prop-types"
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
//#region styled component

const Container = styled(Link)`
    background-color: var(--bg-color-2);
    padding: 12px;
    margin:9px;
    position: relative;
    text-decoration: none;
    @media ${device.desktop}{
        width: 100%;
        max-width: 300px;
        height: 260px;
    }

    @media ${device.tablet}{
        width: 100%;
        max-width: 300px;
        height: 235px;
    }

    @media ${device.mobile}{
        width: 100%;
        max-width: 300px;
        height: 205px;
    }

    &:before {
        content: "";
        position: absolute;
        bottom: 15px;
        left: 25px;
        width: 50%;
        height: 50%;
        background-color: var(--box-shadow-color-2);
        box-shadow: 0 0 10px 10px var(--box-shadow-color-2);
        transform: skew(-10deg, -15deg);
        z-index: -1;
    }

    &:after {
        content: "";
        position: absolute;
        bottom: 15px;
        right: 25px;
        width: 50%;
        height: 50%;
        background-color: var(--box-shadow-color-2);
        box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
        transform: skew(10deg, 15deg);
        z-index: -1;
    }

`

const LoadingImageAnimation = keyframes`
    0% { background-color: white; }
    10% { background-color: gray; }
    20% { background-color: white; }
    30% { background-color: gray; }
    40% { background-color: white; }
    50% { background-color: gray; }
    60% { background-color: white; }
    70% { background-color: gray; }
    80% { background-color: white; }
    90% { background-color: gray; }
    100% { background-color: white; }
`

const Image = styled.img`
    width: 100%;
    object-fit: cover;
    display: ${props => props.show === true ? "block" : "none"};
    animation:  ${LoadingImageAnimation}  ${props => props.isLoaded === true ? "" : "5s ease infinite"};
    @media ${device.desktop}{
        height: 140px;
    }

    @media ${device.tablet}{
        height: 120px;
    }

    @media ${device.mobile}{
        height: 96px;
    }
`

const Title = styled.div`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    margin-top: 10px;
    color: var(--text-color-1);
    @media ${device.desktop}{
        height: 52px;
    }

    @media ${device.tablet}{
        height: 45px;
    }

    @media ${device.mobile}{
        height: 45px;
    }
`
const LocationBar = styled.div`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 17px;
    color:var(--address-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const MapIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 5px;
`

const Mask = styled.div`
    width: 100%;
    height: ${props => props.show ? "100%" : "0%"};;
    background-color:var(--card-mask-color);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: height 0.3s ease-in;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-1);
`


//#endregion

const SmallCard = ({ data, category }) => {
    const [showDetailLink, setShowDetailLink] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <Container
            // target={pathname === "/detail" ? "_self" : "_blank"}
            to={`/detail?category=${category}&id=${data.ID}`}
            onMouseOver={() => { setShowDetailLink(true) }}
            onMouseOut={() => { setShowDetailLink(false) }}
        >
            <Mask show={showDetailLink} >
                <span>詳細資訊</span>
            </Mask>
            <Image
                className={"lazy"}
                isLoaded={isLoaded}
                show={true}
                data-src={data?.Picture?.PictureUrl1 ? data?.Picture?.PictureUrl1 : "./notfound.png"}
                onLoad={() => { setIsLoaded(true) }}
                onError={(event) => {
                    event.target.src = "./notfound.png"
                }}
            />
            <Title>
                {data?.Name ?
                    data?.Name?.length > 15 ? `${data.Name.substr(0, 15)}...` : data.Name :
                    "無名稱資訊"
                }
            </Title>
            <LocationBar>
                <MapIcon src={"./Icons/Icon/map.png"} />
                {data?.Address ?
                    data?.Address?.length > 15 ? `${data.Address.substr(0, 15)}...` : data.Address
                    :
                    "無地址資訊"
                }
            </LocationBar>
        </Container>
    )
}

SmallCard.propTypes = {
    data: PropTypes.object
}

export default SmallCard
