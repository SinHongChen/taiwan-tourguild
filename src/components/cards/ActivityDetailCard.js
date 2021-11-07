import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { parseJsonToArr } from "helpers/parse";
import { Font1 } from "components/styled/Font";
import Scrollbar from "components/styled/Scrollbar";
import Carousel from 'components/basic/Carousel';
import { device } from 'components/layout/device';

//#region styled component

const Container = styled.div`
    padding:14px 28px;
    background: var(--bg-color-1);
    height: fit-content;

    @media ${device.desktop}{
        padding:14px 28px;
    }

    @media ${device.tablet}{
        padding:14px 28px;
    }

    @media ${device.mobile}{
        padding:14px;
    }
`

const Content = styled.div`
    display: grid;
    grid-gap: 15px;
    margin-top: 15px;

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

const Icon = styled.img`
    width: 22px;
    height: 22px;
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

//#endregion

const ActivityDetailCard = ({ className, style, activity }) => {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        let pictureArr = parseJsonToArr(activity?.Picture)
        if (pictureArr.length > 0) {
            setPictures(pictureArr.filter((value, index) => index % 2 === 0));
        } else {
            setPictures(["./notfound.png"])
        }
    }, [activity])

    return (
        <Container className={className} style={style}>
            <Carousel imgs={pictures} width={"100%"} height={"367px"} />
            <Content>
                <Header>
                    <Title>{activity?.Name}</Title>
                    {activity?.WebsiteUrl &&
                        <>
                            <WebSiteLink target="_blank" href={activity?.WebsiteUrl}>活動網址</WebSiteLink>
                            {/* <a href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(activity?.WebsiteUrl)}`}>分享到line</a> */}
                        </>
                    }
                </Header>
                <Description>{activity?.Description}</Description>

                <Row>
                    <Icon src="./Icons/Icon/time.png" />
                    <Label>{`開始 : ${activity?.StartTime ? `${new Date(activity?.StartTime).toLocaleString()}` : "無開始時間資訊"}`}</Label>
                </Row>
                <Row>
                    <Icon src="./Icons/Icon/time.png" />
                    <Label>{`結束 : ${activity?.EndTime ? `${new Date(activity?.EndTime).toLocaleString()}` : "無結束時間資訊"}`}</Label>
                </Row>
                <Row>
                    <Icon src="./Icons/Icon/ticket.png" />
                    <Label>{activity?.Charge ? activity?.Charge : "無票價資訊"}</Label>
                </Row>
                <Row>
                    <Icon src="./Icons/Icon/map.png" />
                    <Label>{activity?.Address ? activity?.Address : "無位置資訊"}</Label>
                </Row>
                <Row>
                    <Icon src="./Icons/Icon/tel.png" />
                    <Label>{activity?.Phone ? activity?.Phone : "無電話資訊"}</Label>
                </Row>
            </Content>

        </Container>
    )
}

export default ActivityDetailCard
