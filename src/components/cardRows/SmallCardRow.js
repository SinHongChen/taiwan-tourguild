import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SmallCard } from "components/hub/CardHub";
import useMedia from 'hook/useMedia';
import { device } from "components/layout/device";
import { Searching } from 'components/animation/Animations';
import { NoFoundData, TriangleLogo, RectangleLogo } from 'components/hub/BasicComponentHub';
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom';


//#region styled component
const Container = styled.div`
    width: 100%;
    display: ${props => props.show ? "block" : "none"};
    z-index: var(--smallcardrow-index);
    position: relative;
    padding: 0;
    margin-top: 30px;
    @media ${device.tablet}{
    }

    @media ${device.mobile}{
    }
`

const CardRow = styled.div`
    grid-gap: 9px;
    height: fit-content;
    width: 100%;
    display:${props => props.show === true ? "grid" : "none"};
    @media ${device.desktop}{
        align-items: center;
        justify-content: center;
        justify-items: center;
        grid-template-columns: repeat(5, 1fr);
    }

    @media ${device.tablet}{
        align-items: center;
        justify-content: center;
        justify-items: center;
        grid-template-columns: repeat(4, 1fr);
    }

    @media ${device.mobile}{
        align-items: center;
        justify-content: center;
        justify-items: center;
        grid-template-columns: repeat(2, 1fr);
    }
`

const Title = styled.div`
    height: 30px;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    position: relative;
    margin-bottom: 20px;
    color: var(--text-color-1);
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media ${device.desktop}{
        font-size: 20px;
    }

    @media ${device.tablet}{
        font-size: 20px;
    }

    @media ${device.mobile}{
        font-size: 18px;
    }
`


const SearchingAnimation = styled(Searching)`
    display:${props => props.show === true ? "flex" : "none"};
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
//#endregion

const SmallCardRow = ({
    list,
    title,
    logo,
    show = true,
    isNotFound,
    isSearching,
    category
}) => {

    return (
        <Container show={show}>
            <Title>
                <RectangleLogo show={logo === "rectangle"} />
                <TriangleLogo show={logo === "triangle"} />
                <div>{title}</div>
            </Title>
            <SearchingAnimation show={isSearching} />
            <NoFoundData show={isNotFound && !isSearching} />
            <CardRow show={!isSearching}>
                {list?.map((data, index) => {
                    return <SmallCard key={index} data={data} category={category} />
                })}
            </CardRow>
        </Container>

    )
}

SmallCardRow.propTypes = {

}

export default SmallCardRow
