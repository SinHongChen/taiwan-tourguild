import React from 'react'
import styled from 'styled-components';

//#region styled component

const Container = styled.div`
    width: 20px;
    height: 20px;
    background: var(--yellow); 
    margin-right: 14px;
    display:${props => props.show ? "block" : "none"};
`
//#endregion

const RectangleLogo = ({ show }) => {
    return (
        <Container show={show} />
    )
}

export default RectangleLogo
