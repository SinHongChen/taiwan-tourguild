import React from 'react'
import styled from 'styled-components';


//#region styled component

const Container = styled.div`
    margin-bottom: 10px;
    margin-right: 14px;
    border: transparent 10px solid;
    border-bottom: 20px var(--pink) solid;
    display:${props => props.show ? "block" : "none"};
    width: 20px;
    height: 20px;
`

//#endregion


const TriangleLogo = ({ show }) => {
    return (
        <Container show={show} />
    )
}

export default TriangleLogo
