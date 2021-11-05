import React from 'react'
import styled from 'styled-components'

//#region styled component

const Button = styled.button`
    background-color: ${props => props.color === "yellow" ? "var(--yellow)" : "var(--pink)"
    };
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 10px;
    width: 40px;
    height: 40px;
    box-shadow: 0px 4px 3px rgba(13, 11, 12, 0.2);
    border-radius: 6px;

    &:hover{
        cursor: pointer;
    }
`

const Icon = styled.img`

`
//#endregion

const SearchButton = ({ onClick }) => {
    return (
        <Button type="submit" onClick={onClick}>
            <Icon src="./Icons/Icon/search.png" />
        </Button>
    )
}

const GpsButton = ({ onClick }) => {
    return (
        <Button type="button" onClick={onClick} color="yellow">
            <Icon src="./Icons/Icon/GPS.png" />
        </Button>
    )
}

export {
    SearchButton,
    GpsButton
}
