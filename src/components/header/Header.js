import React from 'react'
import styled from 'styled-components';
import { deviceMedia } from "helpers/device";

const Container = styled.div`
    width: 100%;
    position: relative;
    z-index: var(--header-index);
    height: fit-content;

    @media ${deviceMedia.desktop}{
        &:before {
            content: "";
            position: absolute;
            bottom: 5px;
            left: 25px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 10px 10px var(--box-shadow-color-2);
            transform: skew(-15deg, -2deg);
            z-index: -1;
        }

        &:after {
            content: "";
            position: absolute;
            bottom: 5px;
            right: 25px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
            transform: skew(10deg, 2deg);
            z-index: -1;
        }
    }

    @media ${deviceMedia.tablet}{
        &:before {
            content: "";
            position: absolute;
            bottom: 6px;
            left: 25px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 10px 10px var(--box-shadow-color-2);
            transform: skew(-15deg, -2deg);
            z-index: -1;
        }

        &:after {
            content: "";
            position: absolute;
            bottom: 6px;
            right: 25px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
            transform: skew(10deg, 2deg);
            z-index: -1;
        }
    }

    @media ${deviceMedia.mobile}{
        &:before {
            content: "";
            position: absolute;
            bottom: 8px;
            left: 15px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 10px 10px var(--box-shadow-color-2);
            transform: skew(-15deg, -2deg);
            z-index: -1;
        }

        &:after {
            content: "";
            position: absolute;
            bottom: 8px;
            right: 15px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
            transform: skew(10deg, 2deg);
            z-index: -1;
        }
    }
`

const Header = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default Header
