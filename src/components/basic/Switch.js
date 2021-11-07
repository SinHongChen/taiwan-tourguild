import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


//#region styled component

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`


const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: .4s;
  transition: .4s;
  background-color: ${props => props.status ? "#2196F3" : "#ccc"};
  border-radius: 1em;

  &:before{
    border-radius: 1em;
    position: absolute;
    content: "";
    height: 23px;
    width: 23px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    -webkit-transform: ${props => props.status && "translateX(26px)"};
    -ms-transform: ${props => props.status && "translateX(26px)"};
    transform: ${props => props.status && "translateX(26px)"};
  }
`
//#endregion

const Switch = ({ callback, defaultStatus }) => {

  return (
    <Container onClick={() => { callback(!defaultStatus); }}>
      <Slider status={defaultStatus} />
    </Container>
  )
}

export default Switch
