import React, { useState } from 'react'
import styled from 'styled-components';
import { device } from "helpers/device";
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import {
    Location as LocationIcon,
} from "components/basic/SmallIcons";
import LazyImage from 'components/basic/LazyImage';

//#region styled component

const Container = styled(Link)`
    background-color: var(--bg-color-2);
    padding: 12px;
    margin:9px;
    position: relative;
    text-decoration: none;
    @media ${device.desktop}{
        width: 100%;
        max-width: 400px;
        height: 320px;
    }

    @media ${device.tablet}{
        width: 100%;
        max-width: 300px;
        height: 260px;
    }

    @media ${device.mobile}{
        width: 100%;
        max-width: 400px;
        height: 260px;
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

const MapIcon = styled(LocationIcon)`
    width: 16px;
    height: 16px;
    font-size: 16px;
    margin-right: 8px;
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
            <LazyImage imgSrc={data?.Picture?.PictureUrl1} />
            <Title>
                {data?.Name ?
                    data?.Name?.length > 15 ? `${data.Name.substr(0, 15)}...` : data.Name :
                    "無名稱資訊"
                }
            </Title>
            <LocationBar>
                <MapIcon />
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
