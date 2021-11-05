import React from 'react'
import styled from 'styled-components'
import { device } from 'components/layout/device'
import { Font1 } from 'components/styled/Font'
const Container = styled.div`
    padding: 50px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: var(--smallcardrow-index);
    width: 90%;
    max-width: 900px;
    margin:0 auto;
    overflow: hidden;
`

const Dashboard = styled.div`
    width: 100%;
    padding:30px;
    background-color: var(--bg-color-2);
    position: relative;

    &:before {
        content: "";
        position: absolute;
        bottom: 10px;
        left: 50px;
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
        bottom: 10px;
        right: 50px;
        width: 50%;
        height: 50%;
        background-color: var(--box-shadow-color-2);
        box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
        transform: skew(10deg, 2deg);
        z-index: -1;
    }

    @media ${device.desktop}{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 10px;
        grid-row-gap: 25px; 
    }

    @media ${device.tablet}{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 10px;   
        grid-row-gap: 25px; 
    }

    @media ${device.mobile}{
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 10px;    }
`

const StopInfo = styled.div`
    display: grid;
    grid-gap: 15px;
    justify-items: flex-start;
    align-items: center;
    grid-template-columns: 110px 1fr;
`

const StopName = styled.div`
    text-align:left;
    ${Font1}
    font-size: 16px;
`

const ArrivalTime = styled.div`
    border:1px solid var(--text-color-1);
    padding:10px 25px;
    border-radius: 0.3em;
    text-align:center;
    width: 110px;
    ${Font1}
`

const Hint = styled.div`
    width: 100%;
    text-align:right;
    margin-bottom: 15px;
    ${Font1}
    color:var(--pink);
`



const Bus = () => {
    return (
        <Container>
            <Hint>
                *每隔5秒自動更新
            </Hint>
            <Dashboard>
                {[1, 2, 4, 5, 6, 7, 8, 9, 9, 0, 3, 1, 1, 2, 2, 3].map((data) => {
                    return (
                        <StopInfo>
                            <ArrivalTime>
                                16:09
                            </ArrivalTime>
                            <StopName >
                                大安森林公園
                            </StopName>
                        </StopInfo>)
                })}

            </Dashboard>
        </Container>
    )
}

export default Bus
