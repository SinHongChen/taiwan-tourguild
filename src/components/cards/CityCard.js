import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { device } from "components/layout/device";
import PropTypes from "prop-types"
import { Location as LocationIcon } from 'components/basic/SmallIcons';

//#region styled component
const Container = styled(Link)`
    display: block;
    background-color: var(--bg-color-2);
    padding: 12px;
    position: relative;
    background: var(--bg-color-2);
    box-shadow: 0px 4px 3px var(--box-shadow-color-3);
    @media ${device.desktop}{
        width: 100%;
        height: 100%;    
    }

    @media ${device.tablet}{
        width: 140px;
        height: 100%;    
    }

    @media ${device.mobile}{
        width: 140px;
        height: 100%;    
    }

    &:hover{
        cursor: pointer;
    }
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const LocationBar = styled.div`
    position: absolute;
    left: 12px;
    top: 12px;
    width: calc(100% - 24px);
    height: calc(100% - 24px);
    background-color: rgba(100,100,100,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`

const Title = styled.div`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: var(--text-color-3);
`

const CityLocationIcon = styled(LocationIcon)`
    color: white;
    margin-bottom: 2px;
    font-size: 16px;
    width: 16px;
    height: 16px;
`

//#endregion

const CityCard = ({ city }) => {
    return (
        <Container to={`citySearchResult?city=${city.value}&category=&keyword=&page=1`}>
            <Image src={city.image} />
            <LocationBar>
                <CityLocationIcon />
                <Title>{city.name}</Title>
            </LocationBar>
        </Container>
    )
}

CityCard.propTypes = {
    city: PropTypes.object,
}

export default CityCard
