import React, { useState } from 'react'
import styled from 'styled-components'
import CategoryMenu from 'components/basic/CategoryMenu';
import { categoryMenu } from "helpers/menu";
import { ResultByPosition } from 'components/result/Results';
import { useSelector } from 'react-redux';
import { selectCoord } from "slice/positionSlice";

const CategoryResult = styled.div`
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
`

const PositionResult = () => {
    const coord = useSelector(selectCoord);
    const [selectedCategory, setSelectedCategory] = useState(categoryMenu[0].value);
    let lat = coord === null ? 25.0704863 : coord.lat;
    let lon = coord === null ? 121.4979198 : coord.lon;
    return (
        <CategoryResult>
            <CategoryMenu setSelected={setSelectedCategory} selected={selectedCategory} />
            {categoryMenu.map((category) => {
                return (
                    <ResultByPosition
                        category={category.value}
                        lat={lat}
                        lon={lon}
                        slice={10}
                        show={category.value === selectedCategory}
                        distance={10000}
                    />
                )
            })}

        </CategoryResult>
    )
}

export default PositionResult
