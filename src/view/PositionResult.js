import React, { useState } from 'react'
import styled from 'styled-components'
import { categoryMenu } from "helpers/menu";
import ResultByPosition from 'components/result/ResultByPosition';
import { useSelector } from 'react-redux';
import { selectCoord, selectGpsEnable } from "slice/positionSlice";
import { useEffect } from 'react';
import { deviceMedia } from "helpers/device";
import { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
    width: 94%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;

    @media ${deviceMedia.desktop}{
        padding: 60px 0px;
    }

    @media ${deviceMedia.tablet}{
        padding: 40px 0 40px 0px;
    }

    @media ${deviceMedia.mobile}{
        padding: 40px 0px;
    }
`

const CategoryResult = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
`

const PositionResult = () => {
    const coord = useSelector(selectCoord);
    const gpsEnabled = useSelector(selectGpsEnable);
    const history = useHistory();

    const [searchParams, setSearchParams] = useState({
        category: "",
        lat: coord?.lat,
        lon: coord?.lon,
        distance: 10000,
        page: 1
    })

    useLayoutEffect(() => {
        if (!gpsEnabled) {
            history.push("/GPS");
        }
    }, [])

    return (
        <Container>
            <CategoryResult>
                {categoryMenu.map((category, index) => {
                    return (
                        <ResultByPosition key={index}
                            title={`你附近的${category.name}`}
                            slice={8}
                            isShow={true}
                            canChangePage={false}
                            searchParams={{ ...searchParams, category: category.value }}
                        />
                    )
                })}

            </CategoryResult>
        </Container>

    )
}

export default PositionResult
