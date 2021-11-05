import React from 'react'
import styled from 'styled-components'
import { device } from "components/layout/device";


const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    background-color:var(--bg-color-2);
    position: relative;
    
    @media ${device.desktop}{
        height: var(--desktop-banner-height);
        padding: 0px 0px 28px 0px;

    }

    @media ${device.tablet}{
        height: var(--tablet-banner-height);
    }

    @media ${device.mobile}{
        height: var(--mobile-banner-height);
    }
`

const Image = styled.img`
    width: calc(100% - 56px);
    height: calc(var(--desktop-banner-height) - 28px);
    object-fit: cover;
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

const Mask = styled.div`
    width: calc(100% - 56px);
    height: calc(var(--desktop-banner-height) - 28px);
    position: absolute;
    top: 0px;
    left: 28px;
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1));
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


const Banner = () => {
    return (
        <Container>
            <Mask />
            <Image src={"./banner/banner1.jpg"} />
        </Container>
    )
}

export default Banner
