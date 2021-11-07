import useMedia from 'hook/useMedia';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CityCard } from 'components/hub/Cards';
import { device } from "components/layout/device";
import PropTypes from "prop-types";
import { CaretLeft, CaretRight } from "components/basic/SmallIcons";

//#region styled component

const Container = styled.div`
    position: relative;
    width: 100%;

    @media ${device.desktop}{
        overflow: visible;
        padding: 0 30px;
    }

    @media ${device.tablet}{
        overflow: auto;
    }

    @media ${device.mobile}{
        overflow: auto;
    }
`

const CardRow = styled.div`

    @media ${device.desktop}{
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(6,1fr);
    }

    @media ${device.tablet}{
        display: grid;
        grid-gap: 15px;    
        grid-auto-flow: column;
        height: fit-content;
        overflow: auto;
        padding: 10px;
    }

    @media ${device.mobile}{
        display: grid;
        grid-gap: 15px;    
        grid-auto-flow: column;
        height: fit-content;
        overflow: auto;
        padding: 10px;
    }
`

const FullFrame = styled.div`

`


const HalfFrame = styled.div`
    display: grid;
    grid-row-gap: 10px;
`


const RectangleLogo = styled.div`
    width: 20px;
    height: 20px;
    background: var(--yellow); 
    margin-right: 14px;
    display:${props => props.show ? "block" : "none"};
`

const TriangleLogo = styled.div`
    margin-bottom: 10px;
    margin-right: 14px;
    border: transparent 10px solid;
    border-bottom: 20px var(--pink) solid;
    display:${props => props.show ? "block" : "none"};
`


const Title = styled.div`
    height: 30px;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
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

const PreviousButton = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 32px;
    height: 32px;
    background: var(--bg-color-2);
    box-shadow: 0px 4px 3px var(--box-shadow-color-2);
    border-radius: 6px;
    position: absolute;
    left: -20px;
    top: 55%;
    z-index:3;

    &:hover{
        cursor: pointer;
    }
`

const NextButton = styled.a`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 32px;
    height: 32px;
    background: var(--pink);
    box-shadow: 0px 4px 3px var(--box-shadow-color-2);
    border-radius: 6px;
    position: absolute;
    right: -20px;
    top: 55%;
    z-index:3;

    &:hover{
        cursor: pointer;
    }
`

const NextIcon = styled(CaretRight)`
    width: 100%;
    font-size: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    color: white;
`

const PreviousIcon = styled(CaretLeft)`
    width: 100%;
    font-size: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    color: white;
`


const convertListToCityMenu = (list, index, size) => {
    let sliceList = list.slice(index, index + size);
    let cityMenu = [];

    for (let i = 0; i < Math.ceil(sliceList.length / 3); i++) {
        cityMenu.push(sliceList.slice(i, i + 3));
    }

    return cityMenu;
}

//#endregion

const CityCardRow = ({ list, title, logo, show = true }) => {
    const { mediaWidth, isPc } = useMedia();
    const [cityCardScrollIndex, setCityCardScrollIndex] = useState(0);
    const [cityMenu, setCityMenu] = useState(convertListToCityMenu(list, 0, 9))

    useEffect(() => {
        if (isPc()) {
            setCityMenu(convertListToCityMenu(list, cityCardScrollIndex, 9));
        } else {
            setCityMenu(convertListToCityMenu(list, 0, list.length));
        }
    }, [mediaWidth])


    const handleNextCard = () => {
        if (cityCardScrollIndex < list.length - 10) {
            setCityCardScrollIndex(cityCardScrollIndex + 1);
            setCityMenu(convertListToCityMenu(list, cityCardScrollIndex + 1, 9));
        }
    }

    const handlePreviousCard = () => {
        if (cityCardScrollIndex > 0) {
            setCityCardScrollIndex(cityCardScrollIndex - 1);
            setCityMenu(convertListToCityMenu(list, cityCardScrollIndex - 1, 9));
        }
    }

    return (
        <Container>
            <Title>
                <RectangleLogo show={logo === "rectangle"} />
                <TriangleLogo show={logo === "triangle"} />
                <div>{title}</div>
            </Title>
            <CardRow>
                {cityMenu?.map((data, index) => {
                    return (
                        <>
                            <FullFrame>
                                <CityCard city={data[0]} />
                            </FullFrame>
                            <HalfFrame>
                                <CityCard city={data[1]} />
                                <CityCard city={data[2]} />
                            </HalfFrame>
                        </>
                    )
                })}
            </CardRow>
            {isPc() &&
                <>
                    <NextButton
                        onClick={handleNextCard}
                    >
                        <NextIcon />
                    </NextButton>
                    <PreviousButton
                        onClick={handlePreviousCard}
                    >
                        <PreviousIcon />
                    </PreviousButton>
                </>
            }

        </Container>
    )
}


CityCardRow.propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string,
    logo: PropTypes.oneOf(["rectangle", "triangle"]),
    show: PropTypes.bool
}


export default CityCardRow
