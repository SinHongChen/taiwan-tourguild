import React from 'react'
import { useState } from 'react'
import styled from "styled-components"

const Container = styled.img`
    width: 100%;
    object-fit: cover;
    display: ${props => props.show === true ? "block" : "none"};
`

const Image = ({ imgSrc }) => {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Container
            className="lazy"
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

export default Image
