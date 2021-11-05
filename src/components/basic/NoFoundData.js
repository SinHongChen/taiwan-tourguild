import React from 'react'
import styled from 'styled-components'
import { Empty } from 'components/animation/Animations';
import { device } from 'components/layout/device';


//#region styled component

const NotFoundSection = styled.div`
    width: 100%;
    height: fit-content;
    display:${props => props.show === true ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const EmptyAnimation = styled(Empty)`
    height: auto;
    margin:20px auto;
    @media ${device.desktop}{
        width: 400px;
    }

    @media ${device.tablet}{
        width: 250px;
    }

    @media ${device.mobile}{
        width: 200px;
    }
`

const Title = styled.h3`
    color: var(--text-color-2);
    letter-spacing: 1.5px;
`

//#endregion

const NoFoundData = ({ show }) => {
    return (
        <NotFoundSection show={show}>
            <Title >查無資料</Title>
            <EmptyAnimation />
        </NotFoundSection>
    )
}

export default NoFoundData
