import React from 'react'
import styled from 'styled-components'
import { Font1 } from 'components/styled/Font'
import { device } from "helpers/device";

const Container = styled.div`
    height: fit-content;
    background-color: var(--bg-color-2);
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;


    @media ${device.desktop}{
        padding: 0 20%;
    }

    @media ${device.tablet}{
        padding: 0 20%;
    }

    @media ${device.mobile}{
        padding: 0 5%;
    }
`

const Direction = styled.div`
    ${Font1}
    text-align:center;
    font-size: 16px;
    padding-bottom: 20px;
    border-bottom: ${props => props.selected ? "5px solid var(--pink)" : "5px solid rgba(0,0,0,0)"};
    &:hover{
        cursor: pointer;
    }
`

const PathName = styled.span`
    color: var(--pink);
    margin-left: 10px;
`

const BusRoute = () => {
    return (
        <Container>
            <Direction selected={true}>
                往
                <PathName>
                    蘭潭
                </PathName>
            </Direction>
            <Direction>
                往
                <PathName>
                    港坪運動公園
                </PathName>
            </Direction>
        </Container>
    )
}

export default BusRoute
