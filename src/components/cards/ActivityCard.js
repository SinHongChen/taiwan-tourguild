import React, { useState } from 'react'
import styled from 'styled-components';
import { device } from "helpers/device";
import useMedia from 'hook/useMedia';
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';
import { Location as LocationIcon } from 'components/basic/SmallIcons';


//#region styled component
const Container = styled(Link)`
    background-color: var(--bg-color-2);
    padding: 12px;
    position: relative;
    display: flex;
    align-items: center;
    text-decoration: none;

    &:hover{
        cursor: pointer;
    }
    @media ${device.desktop}{
        width: 100%;
        max-width: 800px;
        height: 223px;
    }

    @media ${device.tablet}{
        width: 100%;
        height: 220px;
    }

    @media ${device.mobile}{
        width: 100%;
        height: 180px;
    }

    &:before {

        @media ${device.desktop}{
            content: "";
            position: absolute;
            bottom: 40px;
            left: 30px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 10px 10px var(--box-shadow-color-2);
            transform: skew(-10deg, -15deg);
            z-index: -1;
        }

        @media ${device.tablet}{
            content: "";
            position: absolute;
            bottom: 35px;
            left: 20px;
            width: 50%;
            height: 20%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 10px 10px var(--box-shadow-color-2);
            transform: skew(-10deg, -15deg);
            z-index: -1;
        }

        @media ${device.mobile}{
            content: "";
            position: absolute;
            bottom: 35px;
            left: 20px;
            width: 50%;
            height: 20%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 10px 10px var(--box-shadow-color-2);
            transform: skew(-10deg, -15deg);
            z-index: -1;
        }

    }

    &:after {
        @media ${device.desktop}{
            content: "";
            position: absolute;
            bottom: 40px;
            right: 30px;
            width: 50%;
            height: 50%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
            transform: skew(10deg, 15deg);
            z-index: -1;
        }

        @media ${device.tablet}{
            content: "";
            position: absolute;
            bottom: 35px;
            right: 20px;
            width: 50%;
            height: 20%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
            transform: skew(10deg, 15deg);
            z-index: -1;
        }

        @media ${device.mobile}{
            content: "";
            position: absolute;
            bottom: 35px;
            right: 20px;
            width: 50%;
            height: 20%;
            background-color: var(--box-shadow-color-2);
            box-shadow: 0 0 15px 10px var(--box-shadow-color-2);
            transform: skew(10deg, 15deg);
            z-index: -1;
        }

    }
`

const Left = styled.div`

`

const Right = styled.div`
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
`

const Image = styled.img`
    display: ${props => props.loaded === true ? "block" : "none"};
    object-fit: cover;
    
    @media ${device.desktop}{
        height: 196px;
        width: 187px;
    }

    @media ${device.tablet}{
        height: 160px;
        width: 130px;
    }

    @media ${device.mobile}{
        height: 160px;
        width: 130px;
    }
`

const Description = styled.div`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: var(--text-color-2);

    @media ${device.tablet}{
    }

    @media ${device.mobile}{
        display: none;
    }
`

const Title = styled.div`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    margin-top: 10px;
    color:var(--text-color-1);
`
const Address = styled.div`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 17px;
    color:var(--address-color);
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const AddressIcon = styled(LocationIcon)`
    font-size: 18px;
    width: 18px;
    height: 18px;
    margin-right: 5px;
`

const DetailButton = styled.button`
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: var(--pink);
    border: var(--pink) 1px solid;
    border-radius: 0.2em;
    outline: none;
    width: 100px;
    height: 32px;
    background-color: var(--bg-color-2);
    margin-left: 10px;

    &:hover{
        cursor: pointer;
    }
    @media ${device.tablet}{
        display: none;
    }

    @media ${device.mobile}{
        display: none;
    }
`

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`
//#endregion

const ActivityCard = ({ data }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const { isPc, isTablet, isMobile } = useMedia();

    return (
        <Container to={`/detail?category=activity&id=${data.ID}`}>
            <Left>
                <Image
                    src={"./notfound.png"}
                    loaded={!imageLoaded}
                    style={{ objectFit: "contain" }}
                >
                </Image>
                <Image
                    src={data?.Picture.PictureUrl1 ? data.Picture.PictureUrl1 : "./notfound.png"}
                    loaded={imageLoaded}
                    onLoad={() => { setImageLoaded(true) }}
                    onError={(ex) => { console.error(ex) }}
                />
            </Left>
            <Right>
                <Title>{data?.Name}</Title>
                {isPc() &&
                    <Description >
                        {data?.Description.length > 80 ? `${data?.Description.substr(0, 80)}...` : data?.Description}
                    </Description>
                }
                {isTablet() &&
                    <Description >
                        {data?.Description.length > 35 ? `${data?.Description.substr(0, 35)}...` : data?.Description}
                    </Description>
                }
                <Row>
                    <Address>
                        <AddressIcon />
                        {data?.Address?.length > 25 ? `${data?.Address.substr(0, 25)}...` : data?.Address}
                    </Address>
                    <DetailButton>查看詳請</DetailButton>
                </Row>
            </Right>
        </Container>
    )
}


ActivityCard.propTypes = {
    data: PropTypes.object,
    onClick: PropTypes.func,
}


export default ActivityCard
