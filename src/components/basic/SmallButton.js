import React from 'react'
import styled from 'styled-components'
import { GPS as GPSIcon, Search as SearchIcon } from "components/basic/SmallIcons";

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

const ModifySearchIcon = styled(SearchIcon)`
    font-size: 24px;
    height: 24px;
    width: 24px;
    color: white;
`

const ModifyGpsIcon = styled(GPSIcon)`
    color: white;

`


//#endregion

const SearchButton = ({ onClick, className }) => {
    return (
        <Button className={className} type="submit" onClick={onClick}>
            <ModifySearchIcon />
        </Button>
    )
}

const GpsButton = ({ onClick, className }) => {
    return (
        <Button className={className} type="button" onClick={onClick} color="yellow">
            <ModifyGpsIcon />
        </Button>
    )
}


export {
    SearchButton,
    GpsButton
}
