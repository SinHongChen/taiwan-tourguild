import React from 'react';
import styled from 'styled-components';
import ActivityCard from 'components/cards/ActivityCard';
import { deviceMedia } from "helpers/device";
import PropTypes from "prop-types"


//#region styled component

const Container = styled.div`
    width: 100%;
    display: ${props => props.show ? "block" : "none"};
    z-index: 2;
    padding: 0;
    position: relative;

    @media ${deviceMedia.tablet}{
    }

    @media only screen and (  max-width :360px){
    }
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

const CardRow = styled.div`
    display: grid;
    height: fit-content;
    align-items: center;
    justify-content: center;
    justify-items: center;
    width: 100%;

    @media ${deviceMedia.desktop}{
        grid-template-columns: 1fr 1fr;
        grid-gap: 39px;
    }

    @media ${deviceMedia.tablet}{
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }

    @media ${deviceMedia.mobile}{
        grid-template-columns: 1fr;
        grid-gap: 20px;
    }
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

    @media ${deviceMedia.desktop}{
        font-size: 20px;
    }

    @media ${deviceMedia.tablet}{
        font-size: 20px;
    }

    @media ${deviceMedia.mobile}{
        font-size: 18px;
    }
`

//#endregion


const ActivityCardRow = ({ list, title, logo, show = true }) => {
    return (
        <Container show={show}>
            <Title>
                <RectangleLogo show={logo === "rectangle"} />
                <TriangleLogo show={logo === "triangle"} />
                <div>{title}</div>
            </Title>
            <CardRow>
                {list?.map((data, index) => {
                    return <ActivityCard key={index} data={data} />
                })}
            </CardRow>
        </Container>

    )
}


ActivityCardRow.propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string,
    logo: PropTypes.oneOf(["rectangle", "triangle"]),
    setSelectedActivity: PropTypes.func.isRequired,
    show: PropTypes.bool
}

export default ActivityCardRow
