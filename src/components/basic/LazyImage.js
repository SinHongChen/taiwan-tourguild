import React from 'react';
import { useState } from 'react';
import styled, { keyframes } from "styled-components";
import { device } from 'components/layout/device';


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

const Container = styled.img`
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
const LazyImage = ({ imgSrc, className }) => {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Container
            className={`${className} lazy`}
            isLoaded={isLoaded}
            show={true}
            data-src={imgSrc ? imgSrc : "./notfound.png"}
            onLoad={() => { setIsLoaded(true) }}
            onError={(event) => {
                event.target.src = "./notfound.png"
            }}
        />
    )
}

export default LazyImage
