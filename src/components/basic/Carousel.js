import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { CaretRight as CaretRightIcon, CaretLeft as CaretLeftIcon } from "components/basic/SmallIcons";
import { useEffect } from 'react';
import PropTypes from "prop-types"


//#region styled component

const Container = styled.div`
    overflow: hidden;
    position: relative;
`

const ImageList = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    position: relative;
    transform: ${props => `translateX(-${props.translateX}%)`};
    transition: transform 0.3s linear;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top:0px;
    left:0px;
    transform: ${props => `translateX(${props.translateX}%)`} ;
`

const SmallImage = styled.img`
    width: 50px;
    height: 50px;
    margin:0px 5px;
    object-fit: cover;
    &:hover{
        cursor: pointer;
    }
`

const NextBtn = styled.button`
    width: 40px;
    height: calc(100% - 70px);
    right: 0px;
    position: absolute;
    top: 0px;
    border: 0px;
    background-color: rgba(10,10,10,0);
    background-color: rgba(10,10,10,0.1);

    &:hover{
        background-color: rgba(10,10,10,0.5);
        cursor: pointer;
    }
`

const PreBtn = styled.button`
    position: absolute;
    width: 40px;
    height: calc(100% - 70px);
    top: 0px;
    left: 0px;
    border: 0px;
    background-color: rgba(10,10,10,0);
    background-color: rgba(10,10,10,0.1);

    &:hover{
        background-color: rgba(10,10,10,0.5);
        cursor: pointer;
    }
`

const NextBtnIcon = styled(CaretRightIcon)`
    color: white;
    width: 100%;
    text-align: center;
`

const PreBtnIcon = styled(CaretLeftIcon)`
    color: white;
    width: 100%;
    text-align: center;
`
const PictureProgressbar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 0px;
    height: 70px;
    overflow: auto;
`

//#endregion

const Carousel = ({ imgs, width, height }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, [imgs])

    return (
        <Container style={{ width: `calc(${width})`, height: `calc(${height})` }}>
            <ImageList translateX={currentIndex * 100}>
                {imgs?.map((img, index) => {
                    return (
                        <Image
                            translateX={index * 100}
                            src={img ? img : "./notfound.png"}
                            onError={(event) => {
                                event.target.src = "./notfound.png"
                            }}
                        />
                    )
                })}
            </ImageList>
            <NextBtn
                onClick={() => {
                    if (currentIndex < imgs.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                    }
                }}
            >
                <NextBtnIcon />
            </NextBtn>
            <PreBtn
                onClick={() => {
                    if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                    }
                }}
            >
                <PreBtnIcon />
            </PreBtn>
            <PictureProgressbar>
                {imgs?.map((img, index) => {
                    return <SmallImage
                        src={img ? img : "./notfound.png"}
                        onError={(event) => {
                            event.target.src = "./notfound.png"
                        }}
                        onClick={() => { setCurrentIndex(index) }}
                        selected={currentIndex === index} />
                })}

            </PictureProgressbar>
        </Container >
    )
}

Carousel.propTypes = {
    imgs: PropTypes.array.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
}


export default Carousel
