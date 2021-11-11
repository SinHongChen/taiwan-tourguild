import React from 'react';
import styled from 'styled-components';
import SmallCard from 'components/cards/SmallCard';
import { deviceMedia } from "helpers/device";
import { Searching } from 'components/animation/Animations';
import ShowNoFoundData from 'components/basic/ShowNoFoundData';
import TriangleLogo from 'components/basic/TriangleLogo';
import RectangleLogo from 'components/basic/RectangleLogo';
import LazyLoadingSection from 'components/basic/LazyLoadingSection';

//#region styled component
const Container = styled.div`
    width: 100%;
    display: ${props => props.isShow ? "block" : "none"};
    z-index: var(--smallcardrow-index);
    position: relative;
    padding: 0;
    @media ${deviceMedia.tablet}{
    }

    @media ${deviceMedia.mobile}{
    }
`

const CardRow = styled.div`
    grid-gap: 9px;
    height: fit-content;
    width: 100%;
    display:${props => props.show === true ? "grid" : "none"};
    @media ${deviceMedia.desktop}{
        align-items: center;
        justify-content: center;
        justify-items: center;
        grid-template-columns: repeat(4, 1fr);
    }

    @media ${deviceMedia.tablet}{
        align-items: center;
        justify-content: center;
        justify-items: center;
        grid-template-columns: repeat(4, 1fr);
    }

    @media ${deviceMedia.mobile}{
        align-items: center;
        justify-content: center;
        justify-items: center;
        grid-template-columns: repeat(2, 1fr);
    }
`

const Title = styled.div`
    height: 30px;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
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


const SearchingAnimation = styled(Searching)`
    display:${props => props.show === true ? "flex" : "none"};
    height: auto;
    margin:20px auto;
    @media ${deviceMedia.desktop}{
        width: 400px;
    }

    @media ${deviceMedia.tablet}{
        width: 250px;
    }

    @media ${deviceMedia.mobile}{
        width: 200px;
    }
`
//#endregion

const SmallCardRow = ({
    list,
    title,
    logo,
    isShow = true,
    isNotFound,
    isSearching,
    category
}) => {

    return (
        <Container isShow={isShow}>
            <Title>
                <RectangleLogo show={logo === "rectangle"} />
                <TriangleLogo show={logo === "triangle"} />
                <div>{title}</div>
            </Title>
            <SearchingAnimation show={isSearching} />
            <ShowNoFoundData show={isNotFound && !isSearching} />
            <LazyLoadingSection>
                <CardRow show={!isSearching}>
                    {list?.map((data, index) => {
                        return <SmallCard key={index} data={data} category={category} />
                    })}
                </CardRow>
            </LazyLoadingSection>
        </Container>

    )
}

SmallCardRow.propTypes = {

}

export default SmallCardRow
