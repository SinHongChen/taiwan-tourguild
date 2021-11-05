import React from 'react'
import styled from 'styled-components'
import { device } from 'components/layout/device'

//#region styled component

const Container = styled.input`
    padding: 0px 12px 0px 10px;
    width: 445px;
    height: 40px;
    left: 395px;
    top: 394px;
    background: var(--bg-color-2);
    color: var(--text-color-1);
    border-radius: 6px;
    border: none;
    outline: none;
    font-size: initial;
    margin-right: 6px;
    box-shadow: 0px 4px 3px var(--box-shadow-color-3);
    -webkit-appearance: none;

    @media ${device.desktop}{
        width: 445px;
    }

    @media ${device.tablet}{
        width: 445px;
    }

    @media ${device.mobile}{
        width: 100%;
    }
`

//#endregion

const Input = ({ onChange }) => {
    return (
        <Container type="text" onChange={onChange} placeholder="搜尋關鍵字" />
    )
}

export default Input
