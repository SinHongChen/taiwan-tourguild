import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseJsonToArr } from "helpers/parse";
import { Font1 } from "components/styled/Font";
import Scrollbar from "components/styled/Scrollbar";
import { deviceMedia } from "helpers/device";
import Carousel from 'components/basic/Carousel';
import useActivity from 'hook/useActivity';
import ResultByPosition from 'components/result/ResultByPosition';
import GoogleMap from 'components/basic/GoogleMap';
import ResultByClass from 'components/result/ResultByClass';
import {
    Phone as PhoneIcon,
    Ticket as TicketIcon,
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

const ActivityDetail = ({ className, style, id }) => {
    const [pictures, setPictures] = useState([]);
    const activity = useActivity();
    const [searchParams, setSearchParams] = useState({
        category: "activity",
        lat: null,
        lon: null,
        distance: 10000,
        page: 1,
        className: null
    })


    useEffect(() => {
        let pictureArr = parseJsonToArr(activity.activityInfos[0]?.Picture);
        if (pictureArr.length > 0) {
            setPictures(pictureArr.filter((value, index) => index % 2 === 0));
        } else {
            setPictures(["./notfound.png"])
        }
    }, [activity.activityInfos]);

    useEffect(() => {
        if (isParamExist(id)) {
            activity.getActivityInfoById(id)
                .then((data) => {
                    onGetActivityInfoByIdSucceed(data);
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }, [id]);

    const onGetActivityInfoByIdSucceed = (data) => {
        activity.setActivityInfos(data);
        setSearchParams({
            category: "activity",
            lat: data[0].Position.PositionLat,
            lon: data[0].Position.PositionLon,
            distance: 10000,
            page: 1,
            className: data[0]?.Class1
        })
    }

    const isParamExist = (param) => {
        if (param !== undefined && param !== null) {
            return true;
        }
        return false;
    }

    return (
        <Container className={className} style={style}>
            <ShareLinkbar
                shareUrl={`${window.location.origin}/#/detail?category=activity&id=${activity.activityInfos[0]?.ID}`}
            />
            <CarouselContainer>
                <Carousel imgs={pictures} width={"100%"} height={"100%"} />
            </CarouselContainer>

            <Content>
                <Header>
                    <Title>{activity.activityInfos[0]?.Name}</Title>
                    {activity.activityInfos[0]?.WebsiteUrl &&
                        <WebSiteLink target="_blank" href={activity.activityInfos[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                    }
                </Header>
                <Description>{activity.activityInfos[0]?.Description}</Description>

                <Row>
                    <TimeIcon />
                    <Label>{`開始 : ${activity.activityInfos[0]?.StartTime ? `${new Date(activity.activityInfos[0]?.StartTime).toLocaleString()}` : "無開始時間資訊"}`}</Label>
                </Row>
                <Row>
                    <TimeIcon />
                    <Label>{`結束 : ${activity.activityInfos[0]?.EndTime ? `${new Date(activity.activityInfos[0]?.EndTime).toLocaleString()}` : "無結束時間資訊"}`}</Label>
                </Row>
                <Row>
                    <TicketIcon />
                    <Label>{activity.activityInfos[0]?.Charge ? activity.activityInfos[0]?.Charge : "無票價資訊"}</Label>
                </Row>
                <Row>
                    <LocationIcon />
                    <Label>{activity.activityInfos[0]?.Address ? activity.activityInfos[0]?.Address : "無位置資訊"}</Label>
                </Row>
                <Row>
                    <PhoneIcon />
                    {activity.activityInfos[0]?.Phone ?
                        <PhoneLink href={`tel:+${activity.activityInfos[0]?.Phone}`}>{activity.activityInfos[0]?.Phone}</PhoneLink>
                        :
                        <Label>無電話資訊</Label>
                    }
                </Row>
            </Content>
            <GoogleMap lat={searchParams.lat} lon={searchParams.lon} />
            <ResultByPosition
                style={{ marginTop: "30px" }}
                title={"也在附近的活動"}
                slice={5}
                isShow={true}
                canChangePage={false}
                searchParams={{ ...searchParams, category: "activity" }}
            />
            <ResultByClass
                style={{ marginTop: "30px" }}
                slice={5}
                title={"相同類型活動"}
                isShow={true}
                canChangePage={false}
                searchParams={searchParams}
            />
        </Container>
    )
}

export default ActivityDetail
