import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseJsonToArr } from "helpers/parse";
import { Font1 } from "components/styled/Font";
import Scrollbar from "components/styled/Scrollbar";
import { device } from "helpers/device";
import Carousel from 'components/basic/Carousel';
import ResultByPosition from 'components/result/ResultByPosition';
import useScenicSpot from 'hook/useScenicSpot';
import GoogleMap from 'components/basic/GoogleMap';
import ResultByClass from 'components/result/ResultByClass';
import {
    Phone as PhoneIcon,
    Train as TrainIcon,
    Ticket as TicketIcon,
    Location as LocationIcon,
    Time as TimeIcon,
    Exclamation as ExclamationIcon
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

const ScenicSpotDetail = ({ className, style, id }) => {
    const [pictures, setPictures] = useState([]);
    const scenicSpot = useScenicSpot();
    const [coord, setCoord] = useState(null);

    useEffect(() => {
        if (id !== null && id !== undefined) {
            scenicSpot.getScenicSpotById(id)
                .then((data) => {
                    scenicSpot.setScenicSpots(data);
                    setCoord({
                        lat: data[0]?.Position?.PositionLat,
                        lon: data[0]?.Position?.PositionLon
                    })
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [id])

    useEffect(() => {
        if (scenicSpot.scenicSpots.length > 0) {
            let pictureArr = parseJsonToArr(scenicSpot.scenicSpots[0]?.Picture);
            if (pictureArr.length > 0) {
                setPictures(pictureArr.filter((value, index) => index % 2 === 0));
            } else {
                setPictures(["./notfound.png"])
            }
        }
    }, [scenicSpot.scenicSpots])

    return (
        <Container className={className} style={style}>
            <ShareLinkbar
                shareUrl={`${window.location.origin}/#/detail?category=scenicSpot&id=${scenicSpot.scenicSpots[0]?.ID}`}
            />
            <CarouselContainer>
                <Carousel imgs={pictures} width={"100%"} height={"100%"} />
            </CarouselContainer>
            <Content>
                <Header>
                    <Title>{scenicSpot.scenicSpots[0]?.Name}</Title>
                    {scenicSpot.scenicSpots[0]?.WebsiteUrl &&
                        <WebSiteLink target="_blank" href={scenicSpot.scenicSpots[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                    }
                </Header>
                <Description>{scenicSpot.scenicSpots[0]?.DescriptionDetail}</Description>

                <Row>
                    <TrainIcon />
                    <Label>{`${scenicSpot.scenicSpots[0]?.TravelInfo ? `${scenicSpot.scenicSpots[0]?.TravelInfo}` : "無路線資訊"}`}</Label>
                </Row>
                <Row>
                    <TimeIcon />
                    <Label>{`開放時間 : ${scenicSpot.scenicSpots[0]?.OpenTime ? `${scenicSpot.scenicSpots[0]?.OpenTime}` : "無開放時間資訊"}`}</Label>
                </Row>
                <Row>
                    <ExclamationIcon />
                    <Label>{scenicSpot.scenicSpots[0]?.Remarks ? scenicSpot.scenicSpots[0]?.Remarks : "無注意事項資訊"}</Label>
                </Row>
                <Row>
                    <TicketIcon />
                    <Label>{scenicSpot.scenicSpots[0]?.TicketInfo ? scenicSpot.scenicSpots[0]?.TicketInfo : "無票價資訊"}</Label>
                </Row>
                <Row>
                    <LocationIcon />
                    <Label>{scenicSpot.scenicSpots[0]?.Address ? scenicSpot.scenicSpots[0]?.Address : "無位置資訊"}</Label>
                </Row>
                <Row>
                    <PhoneIcon />
                    {scenicSpot.scenicSpots[0]?.Phone ?
                        <PhoneLink href={`tel:+${scenicSpot.scenicSpots[0]?.Phone}`}>{scenicSpot.scenicSpots[0]?.Phone}</PhoneLink>
                        :
                        <Label>無電話資訊</Label>
                    }
                </Row>

            </Content>
            <GoogleMap coord={coord} />
            <ResultByPosition
                category={"scenicSpot"}
                lat={coord?.lat}
                lon={coord?.lon}
                distance={10000}
                slice={5}
                show={true}
                title={"也在附近的景點"}
                canChangePage={false}
            />
            <ResultByClass
                slice={5}
                title={"相同類型景點"}
                show={true}
                category={"scenicSpot"}
                canChangePage={false}
                className={scenicSpot?.scenicSpots[0]?.Class1}
            />
        </Container>
    )
}

export default ScenicSpotDetail
