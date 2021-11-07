import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseJsonToArr } from "helpers/parse";
import { Font1 } from "components/styled/Font";
import Scrollbar from "components/styled/Scrollbar";
import { GrNext } from "react-icons/gr";
import { device } from "components/layout/device";
import Carousel from 'components/basic/Carousel';
import useActivity from 'hook/useActivity';
import { ResultByPosition } from 'components/result/Results';
import useRestaurant from 'hook/useRestaurant';
import GoogleMap from 'components/basic/GoogleMap';
import { RestaurantsResultByClass } from 'components/result/RestaurantsResult';
import {
    Phone as PhoneIcon,
    Location as LocationIcon,
    Time as TimeIcon,
} from "components/basic/SmallIcons";

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

//#endregion

const RestaurantDetail = ({ className, style, id }) => {
    const [pictures, setPictures] = useState([]);
    const restaurant = useRestaurant();
    const [coord, setCoord] = useState(null);

    useEffect(() => {
        restaurant.getRestaurantById(id)
            .then((data) => {
                restaurant.setRestaurants(data);
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
        let pictureArr = parseJsonToArr(restaurant.restaurants[0]?.Picture);
        if (pictureArr.length > 0) {
            setPictures(pictureArr.filter((value, index) => index % 2 === 0));
        } else {
            setPictures(["./notfound.png"])
        }
    }, [restaurant.restaurants])

    return (
        <Container className={className} style={style}>
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
                    <Label>{restaurant.restaurants[0]?.Phone ? restaurant.restaurants[0]?.Phone : "無電話資訊"}</Label>
                </Row>
            </Content>
            <GoogleMap coord={coord} />
            <ResultByPosition
                category={"restaurant"}
                lat={coord?.lat}
                lon={coord?.lon}
                distance={10000}
                slice={5}
                show={true}
                title={"也在附近的美食"}
            />
            <RestaurantsResultByClass
                slice={5}
                title={"相同類型美食"}
                show={true}
                category={"restaurant"}
                enablePageChange={false}
                restaurantClass={restaurant?.restaurants[0]?.Class}
            />
        </Container>
    )
}

export default RestaurantDetail
