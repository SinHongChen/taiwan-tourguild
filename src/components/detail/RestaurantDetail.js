import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseJsonToArr } from "helpers/parse";
import { Font1 } from "components/styled/Font";
import Scrollbar from "components/styled/Scrollbar";
import { deviceMedia } from "helpers/device";
import Carousel from 'components/basic/Carousel';
import ResultByPosition from 'components/result/ResultByPosition';
import useRestaurant from 'hook/useRestaurant';
import GoogleMap from 'components/basic/GoogleMap';
import ResultByClass from 'components/result/ResultByClass';
import {
    Phone as PhoneIcon,
    Location as LocationIcon,
    Time as TimeIcon,
} from "components/basic/SmallIcons";
import ShareLinkbar from './ShareLinkbar';


//#region styled component
const Container = styled.div`
    background: var(--bg-color-1);
    height: fit-content;
    max-width: 1200px;
    margin:0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    
    @media ${deviceMedia.desktop}{
        padding:40px 28px;
    }

    @media ${deviceMedia.tablet}{
        padding:40px 28px;
    }

    @media ${deviceMedia.mobile}{
        padding:40px 14px;
    }
`

const Content = styled.div`
    display: grid;
    grid-gap: 15px;
    margin: 15px 0px 50px 0px;

    @media ${deviceMedia.desktop}{
        grid-template-columns: repeat(2,1fr);
    }
    @media ${deviceMedia.tablet}{
        grid-template-columns: repeat(2,1fr);
    }
    @media ${deviceMedia.mobile}{
        grid-template-columns: 1fr;
    }
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media ${deviceMedia.desktop}{
        grid-column-start: 1;
        grid-column-end: 3;    
    }
    @media ${deviceMedia.tablet}{
        grid-column-start: 1;
        grid-column-end: 3;   
     }
    @media ${deviceMedia.mobile}{
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

    @media ${deviceMedia.desktop}{
        grid-column-start: 1;
        grid-column-end: 3;    
    }
    @media ${deviceMedia.tablet}{
        grid-column-start: 1;
        grid-column-end: 3;   
     }
    @media ${deviceMedia.mobile}{
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
    @media ${deviceMedia.desktop}{
        height: 600px;
 
    }
    @media ${deviceMedia.tablet}{
        height: 500px;

     }
    @media ${deviceMedia.mobile}{
        height: 400px;
    }
`

const PhoneLink = styled.a`
    text-decoration: none;
    color: #4287f5;
`

//#endregion

const RestaurantDetail = ({ className, style, id }) => {
    const [pictures, setPictures] = useState([]);
    const restaurant = useRestaurant();
    const [searchParams, setSearchParams] = useState({
        category: "restaurant",
        lat: null,
        lon: null,
        distance: 10000,
        page: 1,
        className: null
    })

    useEffect(() => {
        restaurant.getRestaurantById(id)
            .then((data) => {
                onGetRestaurantByIdSucceed(data);
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    const onGetRestaurantByIdSucceed = (data) => {
        restaurant.setRestaurants(data);
        console.log(data)
        setSearchParams({
            category: "restaurant",
            lat: data[0].Position.PositionLat,
            lon: data[0].Position.PositionLon,
            distance: 10000,
            page: 1,
            className: data[0]?.Class
        })
    }

    useEffect(() => {
        let pictureArr = parseJsonToArr(restaurant.restaurants[0]?.Picture);
        if (pictureArr.length > 0) {
            setPictures(pictureArr.filter((value, index) => index % 2 === 0));
        } else {
            setPictures(["./notfound.png"])
        }
    }, [restaurant.restaurants])

    return (
        <Container className={className} style={style}>
            <ShareLinkbar
                shareUrl={`${window.location.origin}/#/detail?category=restaurant&id=${restaurant.restaurants[0]?.ID}`}
            />
            <CarouselContainer>
                <Carousel imgs={pictures} width={"100%"} height={"100%"} />
            </CarouselContainer>
            <Content>
                <Header>
                    <Title>{restaurant.restaurants[0]?.Name}</Title>
                    {restaurant.restaurants[0]?.WebsiteUrl &&
                        <WebSiteLink target="_blank" href={restaurant.restaurants[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                    }
                </Header>
                <Description>{restaurant.restaurants[0]?.Description}</Description>

                <Row>
                    <TimeIcon />
                    <Label>{`營業時間 : ${restaurant.restaurants[0]?.OpenTime ? `${restaurant.restaurants[0]?.OpenTime}` : "無營業時間資訊"}`}</Label>
                </Row>
                <Row>
                    <LocationIcon />
                    <Label>{restaurant.restaurants[0]?.Address ? restaurant.restaurants[0]?.Address : "無位置資訊"}</Label>
                </Row>
                <Row>
                    <PhoneIcon />
                    {restaurant.restaurants[0]?.Phone ?
                        <PhoneLink href={`tel:+${restaurant.restaurants[0]?.Phone}`}>{restaurant.restaurants[0]?.Phone}</PhoneLink>
                        :
                        <Label>無電話資訊</Label>
                    }
                </Row>
            </Content>
            <GoogleMap lat={searchParams.lat} lon={searchParams.lon} />
            <ResultByPosition
                style={{ marginTop: "30px" }}
                slice={5}
                isShow={true}
                title={"也在附近的美食"}
                canChangePage={false}
                searchParams={searchParams}
            />
            <ResultByClass
                style={{ marginTop: "30px" }}
                slice={5}
                title={"相同類型美食"}
                isShow={true}
                canChangePage={false}
                searchParams={searchParams}
            />
        </Container>
    )
}

export default RestaurantDetail
