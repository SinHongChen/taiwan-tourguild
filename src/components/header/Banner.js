import React from 'react'
import styled from 'styled-components'
import { deviceMedia } from "helpers/device";


const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    background-color:var(--bg-color-2);
    position: relative;
    
    @media ${deviceMedia.desktop}{
        height: var(--desktop-banner-height);
        padding: 0px 0px 28px 0px;

    }

    @media ${deviceMedia.tablet}{
        height: var(--tablet-banner-height);
    }

    @media ${deviceMedia.mobile}{
        height: var(--mobile-banner-height);
    }
`

const Image = styled.img`
    width: calc(100% - 56px);
    height: calc(var(--desktop-banner-height) - 28px);
    object-fit: cover;
    @media ${deviceMedia.desktop}{
        display: block;
    }

    @media ${deviceMedia.tablet}{
        display: none;
    }

    @media ${deviceMedia.mobile}{
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
    @media ${deviceMedia.desktop}{
        display: block;
    }

    @media ${deviceMedia.tablet}{
        display: none;
    }

    @media ${deviceMedia.mobile}{
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
