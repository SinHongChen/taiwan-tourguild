import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Font1 } from 'components/styled/Font';
import { CaretRight as CaretRightIcon, CaretLeft as CaretLeftIcon } from "components/basic/SmallIcons";
import { useRef } from 'react';

//#region styled component

const Container = styled.div`
    overflow: hidden;
    width: 100%;
    position: relative;
`

const Scroller = styled.div`
    padding: 0px 50px;
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    grid-column-gap: ${props => `${props.columnGap}px`};
    width: fit-content;
    transition: transform 0.2s linear;
    transform: ${props => `translateX(-${props.translateX}px)`} ;
`


const CityLink = styled(Link)`
    ${Font1}
    color: var(--text-color-2);
    text-decoration: none;
    border: 1px solid var(--text-color-2);
    border-radius: 0.2em;
    padding: 6px 0px;
    width: ${props => `${props.width}px`};
    text-align:center;

    &:hover{
        color: var(--text-color-1);
        border: 1px solid var(--text-color-1);
    }
`

const NextBtn = styled.a`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50px;
    height: 100%;
    display: ${props => props.isShow ? "flex" : "none"} ;
    align-items: center;
    justify-content: flex-end;
    background-color:var(--bg-color-1);

    &:hover{
        cursor: pointer;
    }
`

const PreBtn = styled.a`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 50px;
    height: 100%;
    display: ${props => props.isShow ? "flex" : "none"} ;
    align-items: center;
    justify-content: flex-start;
    background-color:var(--bg-color-1);

    &:hover{
        cursor: pointer;
    }
`

const NextBtnIcon = styled(CaretRightIcon)`
    color: var(--text-color-2);

`

const PreBtnIcon = styled(CaretLeftIcon)`
    color: var(--text-color-2);

`

//#endregion

const CityLinkRow = ({ cityMenu, title, logo, show = true }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cityLikWidth = 150;
    const scrollerColumnGap = 10;
    const slidingWidth = cityLikWidth + scrollerColumnGap;
    const translateXMax = (cityMenu.length - 1) * slidingWidth;

    const canSlidingToLeft = (transformX) => {
        if (Math.abs(transformX) >= slidingWidth) {
            return true;
        } else {
            return false;
        }
    }

    const canSlidingToRight = (transformX) => {
        if (Math.abs(transformX) < translateXMax) {
            return true;
        } else {
            return false;
        }
    }

    const handleNextBtnClick = () => {
        if (canSlidingToRight(currentIndex * slidingWidth)) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handlePrevBtnClick = () => {
        if (canSlidingToLeft(currentIndex * slidingWidth)) {
            setCurrentIndex(currentIndex - 1);
        }
    }


    return (
        <Container>
            <Scroller
                slidingWidth={slidingWidth}
                translateX={currentIndex * slidingWidth}
                columnGap={scrollerColumnGap}
            >
                {cityMenu?.map((city, index) => {
                    return (
                        <CityLink width={cityLikWidth} to={`citySearchResult?city=${city?.value}`} key={index}>{city.name}</CityLink>
                    )
                })}
            </Scroller>
            <NextBtn onClick={handleNextBtnClick} isShow={true}>
                <NextBtnIcon />
            </NextBtn>
            <PreBtn onClick={handlePrevBtnClick} isShow={true}>
                <PreBtnIcon />
            </PreBtn>
        </Container>
    )
}


CityLinkRow.propTypes = {
    cityMenu: PropTypes.array.isRequired,
    title: PropTypes.string,
    logo: PropTypes.oneOf(["rectangle", "triangle"]),
    show: PropTypes.bool
}


export default CityLinkRow
