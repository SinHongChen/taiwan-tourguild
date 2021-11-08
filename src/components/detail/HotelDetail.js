import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseJsonToArr } from "helpers/parse";
import { Font1 } from "components/styled/Font";
import Scrollbar from "components/styled/Scrollbar";
import { device } from "helpers/device";
import Carousel from 'components/basic/Carousel';
import ResultByPosition from 'components/result/ResultByPosition';
import useHotel from 'hook/useHotel';
import GoogleMap from 'components/basic/GoogleMap';
import ResultByClass from 'components/result/ResultByClass';
import {
    Car as CarIcon,
    Location as LocationIcon,
    Phone as PhoneIcon
} from "components/basic/SmallIcons";
import ShareLinkbar from './ShareLinkbar';

//#region styled component
const Container = styled.div`
    background: var(--bg-color-1);
    height: fit-content;
    max-width: 1200px;
    margin:0 auto;
    
    @media ${device.desktop}{
        padding:40px 28px;
    }

    @media ${device.tablet}{
        padding:40px 28px;
    }

    @media ${device.mobile}{
        padding:40px 14px;
    }
`

const Content = styled.div`
    display: grid;
    grid-gap: 15px;
    margin: 15px 0px 50px 0px;

    @media ${device.desktop}{
        grid-template-columns: repeat(2,1fr);
    }
    @media ${device.tablet}{
        grid-template-columns: repeat(2,1fr);
    }
    @media ${device.mobile}{
        grid-template-columns: 1fr;
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media ${device.desktop}{
        grid-column-start: 1;
        grid-column-end: 3;    
    }
    @media ${device.tablet}{
        grid-column-start: 1;
        grid-column-end: 3;   
     }
    @media ${device.mobile}{
    }
`

const Title = styled.h3`
    ${Font1}
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 1px;
    width: 100%;
    color:var(--text-color-1);
`

const Description = styled.div`
    height: fit-content;
    overflow: auto;
    word-break: break-all;
    ${Scrollbar};
    color:var(--text-color-1);

    @media ${device.desktop}{
        grid-column-start: 1;
        grid-column-end: 3;    
    }
    @media ${device.tablet}{
        grid-column-start: 1;
        grid-column-end: 3;   
     }
    @media ${device.mobile}{
    }
`

const Label = styled.div`
    color:var(--text-color-1);
`

const Row = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24px 1fr;
    grid-gap: 10px;
    width: 100%;
`

const WebSiteLink = styled.a`
    min-width: fit-content;
    display: block;
    text-align:right;
    font-size: 14px;
    color:var(--text-color-4);
`

const CarouselContainer = styled.div`
    width: 100%;
    @media ${device.desktop}{
        height: 600px;
 
    }
    @media ${device.tablet}{
        height: 500px;

     }
    @media ${device.mobile}{
        height: 400px;
    }
`

const PhoneLink = styled.a`
    text-decoration: none;
    color: #4287f5;
`

//#endregion

const HotelDetail = ({ className, style, id }) => {
    const [pictures, setPictures] = useState([]);
    const hotel = useHotel();
    const [coord, setCoord] = useState(null);

    useEffect(() => {
        hotel.getHotelById(id)
            .then((data) => {
                hotel.setHotels(data);
                setCoord({
                    lat: data[0].Position.PositionLat,
                    lon: data[0].Position.PositionLon
                })
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    useEffect(() => {
        let pictureArr = parseJsonToArr(hotel.hotels[0]?.Picture);
        if (pictureArr.length > 0) {
            setPictures(pictureArr.filter((value, index) => index % 2 === 0));
        } else {
            setPictures(["./notfound.png"])
        }
    }, [hotel.hotels])

    return (
        <Container className={className} style={style}>
            <ShareLinkbar
                shareUrl={`${window.location.origin}/#/detail?category=hotel&id=${hotel.hotels[0]?.ID}`}
            />
            <CarouselContainer>
                <Carousel imgs={pictures} width={"100%"} height={"100%"} />
            </CarouselContainer>
            <Content>
                <Header>
                    <Title>{hotel.hotels[0]?.Name}</Title>
                    {hotel.hotels[0]?.WebsiteUrl &&
                        <WebSiteLink target="_blank" href={hotel.hotels[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                    }
                </Header>
                <Description>{hotel.hotels[0]?.Description}</Description>
                <Row>
                    <CarIcon />
                    <Label>{`${hotel.hotels[0]?.ParkingInfo ? `${hotel.hotels[0]?.ParkingInfo}` : "無結束時間資訊"}`}</Label>
                </Row>
                <Row>
                    <LocationIcon />
                    <Label>{hotel.hotels[0]?.Address ? hotel.hotels[0]?.Address : "無位置資訊"}</Label>
                </Row>
                <Row>
                    <PhoneIcon />
                    {hotel.hotels[0]?.Phone ?
                        <PhoneLink href={`tel:+${hotel.hotels[0]?.Phone}`}>{hotel.hotels[0]?.Phone}</PhoneLink>
                        :
                        <Label>無電話資訊</Label>
                    }
                </Row>
            </Content>
            <GoogleMap coord={coord} />
            <ResultByPosition
                category={"hotel"}
                lat={coord?.lat}
                lon={coord?.lon}
                distance={10000}
                slice={5}
                show={true}
                title={"也在附近的旅館"}
                canChangePage={false}
            />
            <ResultByClass
                slice={5}
                title={"相同類型旅館"}
                show={true}
                category={"hotel"}
                canChangePage={false}
                className={hotel?.hotels[0]?.Class}
            />
        </Container>
    )
}

export default HotelDetail
