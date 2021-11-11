import React from 'react';
import styled from 'styled-components';
import { deviceMedia } from 'helpers/device';
import Scrollbar from 'components/styled/Scrollbar';
import { Font1 } from 'components/styled/Font';
import {
    Car as CarIcon,
    Location as LocationIcon,
    Phone as PhoneIcon,
    Time as TimeIcon,
    Ticket as TicketIcon,
    Train as TrainIcon,
    Exclamation as ExclamationIcon
} from "components/basic/SmallIcons";

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


const PhoneLink = styled.a`
    text-decoration: none;
    color: #4287f5;
`

const WebSiteLink = styled.a`
    min-width: fit-content;
    display: block;
    text-align:right;
    font-size: 14px;
    color:var(--text-color-4);
`

const ContentFactory = (type, data) => {
    switch (type) {
        case "restaurant":
            return <RestaurantContent data={data} />;
        case "hotel":
            return <HotelContent data={data} />;
        case "activity":
            return <ActivityContent data={data} />;
        case "scenicSpot":
            return <ScenicSpotContent data={data} />;
        default:
            throw new Error("沒有這種類型的 content");
    }
}

const HotelContent = ({ data }) => {
    return (
        <Content>
            <Header>
                <Title>{data.hotels[0]?.Name}</Title>
                {data.hotels[0]?.WebsiteUrl &&
                    <WebSiteLink target="_blank" href={data.hotels[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                }
            </Header>
            <Description>{data.hotels[0]?.Description}</Description>
            <Row>
                <CarIcon />
                <Label>{`${data.hotels[0]?.ParkingInfo ? `${data.hotels[0]?.ParkingInfo}` : "無結束時間資訊"}`}</Label>
            </Row>
            <Row>
                <LocationIcon />
                <Label>{data.hotels[0]?.Address ? data.hotels[0]?.Address : "無位置資訊"}</Label>
            </Row>
            <Row>
                <PhoneIcon />
                {data.hotels[0]?.Phone ?
                    <PhoneLink href={`tel:+${data.hotels[0]?.Phone}`}>{data.hotels[0]?.Phone}</PhoneLink>
                    :
                    <Label>無電話資訊</Label>
                }
            </Row>
        </Content>
    )
}

const ActivityContent = ({ data }) => {
    return (
        <Content>
            <Header>
                <Title>{data.activityInfos[0]?.Name}</Title>
                {data.activityInfos[0]?.WebsiteUrl &&
                    <WebSiteLink target="_blank" href={data.activityInfos[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                }
            </Header>
            <Description>{data.activityInfos[0]?.Description}</Description>

            <Row>
                <TimeIcon />
                <Label>{`開始 : ${data.activityInfos[0]?.StartTime ? `${new Date(data.activityInfos[0]?.StartTime).toLocaleString()}` : "無開始時間資訊"}`}</Label>
            </Row>
            <Row>
                <TimeIcon />
                <Label>{`結束 : ${data.activityInfos[0]?.EndTime ? `${new Date(data.activityInfos[0]?.EndTime).toLocaleString()}` : "無結束時間資訊"}`}</Label>
            </Row>
            <Row>
                <TicketIcon />
                <Label>{data.activityInfos[0]?.Charge ? data.activityInfos[0]?.Charge : "無票價資訊"}</Label>
            </Row>
            <Row>
                <LocationIcon />
                <Label>{data.activityInfos[0]?.Address ? data.activityInfos[0]?.Address : "無位置資訊"}</Label>
            </Row>
            <Row>
                <PhoneIcon />
                {data.activityInfos[0]?.Phone ?
                    <PhoneLink href={`tel:+${data.activityInfos[0]?.Phone}`}>{data.activityInfos[0]?.Phone}</PhoneLink>
                    :
                    <Label>無電話資訊</Label>
                }
            </Row>
        </Content>
    )

}

const RestaurantContent = ({ data }) => {
    return (
        <Content>
            <Header>
                <Title>{data.restaurants[0]?.Name}</Title>
                {data.restaurants[0]?.WebsiteUrl &&
                    <WebSiteLink target="_blank" href={data.restaurants[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                }
            </Header>
            <Description>{data.restaurants[0]?.Description}</Description>

            <Row>
                <TimeIcon />
                <Label>{`營業時間 : ${data.restaurants[0]?.OpenTime ? `${data.restaurants[0]?.OpenTime}` : "無營業時間資訊"}`}</Label>
            </Row>
            <Row>
                <LocationIcon />
                <Label>{data.restaurants[0]?.Address ? data.restaurants[0]?.Address : "無位置資訊"}</Label>
            </Row>
            <Row>
                <PhoneIcon />
                {data.restaurants[0]?.Phone ?
                    <PhoneLink href={`tel:+${data.restaurants[0]?.Phone}`}>{data.restaurants[0]?.Phone}</PhoneLink>
                    :
                    <Label>無電話資訊</Label>
                }
            </Row>
        </Content>
    )
}

const ScenicSpotContent = ({ data }) => {
    return (
        <Content>
            <Header>
                <Title>{data.scenicSpots[0]?.Name}</Title>
                {data.scenicSpots[0]?.WebsiteUrl &&
                    <WebSiteLink target="_blank" href={data.scenicSpots[0]?.WebsiteUrl}>活動網址</WebSiteLink>
                }
            </Header>
            <Description>{data.scenicSpots[0]?.DescriptionDetail}</Description>

            <Row>
                <TrainIcon />
                <Label>{`${data.scenicSpots[0]?.TravelInfo ? `${data.scenicSpots[0]?.TravelInfo}` : "無路線資訊"}`}</Label>
            </Row>
            <Row>
                <TimeIcon />
                <Label>{`開放時間 : ${data.scenicSpots[0]?.OpenTime ? `${data.scenicSpots[0]?.OpenTime}` : "無開放時間資訊"}`}</Label>
            </Row>
            <Row>
                <ExclamationIcon />
                <Label>{data.scenicSpots[0]?.Remarks ? data.scenicSpots[0]?.Remarks : "無注意事項資訊"}</Label>
            </Row>
            <Row>
                <TicketIcon />
                <Label>{data.scenicSpots[0]?.TicketInfo ? data.scenicSpots[0]?.TicketInfo : "無票價資訊"}</Label>
            </Row>
            <Row>
                <LocationIcon />
                <Label>{data.scenicSpots[0]?.Address ? data.scenicSpots[0]?.Address : "無位置資訊"}</Label>
            </Row>
            <Row>
                <PhoneIcon />
                {data.scenicSpots[0]?.Phone ?
                    <PhoneLink href={`tel:+${data.scenicSpots[0]?.Phone}`}>{data.scenicSpots[0]?.Phone}</PhoneLink>
                    :
                    <Label>無電話資訊</Label>
                }
            </Row>

        </Content>
    )
}

export default ContentFactory
