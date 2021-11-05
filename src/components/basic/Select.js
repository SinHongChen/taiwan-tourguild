import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { device } from "components/layout/device";


//#region styled component

const Container = styled.div`
    position:relative;
    margin-right: 6px;
    box-shadow: 0px 4px 3px var(--box-shadow-color-3);
    width:100%;
`

const MenuSelect = styled.div`
    background:var(--bg-color-2);
    height:40px;
    padding:0px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color:var(--text-color-1);
    width: 100%;
    &:after{
        content:"";
        position:absolute;
        top:15px;
        border: transparent 5px solid;
        border-top:10px solid var(--text-color-1);

        @media ${device.desktop}{
            right:10px;
        }

        @media ${device.tablet}{
            right:10px;
        }

        @media ${device.mobile}{
            right:10px;
        }
    }
    &:hover{
        cursor:pointer;
        -webkit-user-select:none;
        -moz-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
`

const Menu = styled.div`
  margin:0px;
  padding:0px;
  position:absolute;
  left:0px;
  top:35px;
  height:auto;
  overflow:auto;
  display: ${props => props.show ? "block" : "none"};
  max-height: 300px;
  box-shadow: 0px 4px 3px var(--box-shadow-color-3);
  -webkit-appearance: none;
width: 100%;
`

const MenuItem = styled.div`
  background:var(--bg-color-2);
  border-top:1px solid white;
  list-style:none;
  color:var(--text-color-1);
  padding:5px 10px;

  &:hover{
    background:rgba(200,200,200,1);
    color:black;
    cursor:pointer;
  }
`

//#endregion

const Select = ({ list, onChange, defaultItem, className, style }) => {

    const [collapse, setCollapse] = useState(false);
    const [selectedItem, setSelectedItem] = useState(defaultItem)

    useEffect(() => {
        setSelectedItem(defaultItem);
    }, [defaultItem])

    return (
        <Container className={className} style={style}>
            <MenuSelect onClick={() => { setCollapse(!collapse) }}>
                {selectedItem.name}
            </MenuSelect>
            <Menu show={collapse}>
                {list?.map((item, index) => {
                    return (
                        <MenuItem onClick={() => {
                            onChange(item.value)
                            setSelectedItem(item);
                            setCollapse(false);
                        }}
                            key={index}
                        >
                            {item.name}
                        </MenuItem>)
                })}

            </Menu>
        </Container>
    )
}

export default Select
