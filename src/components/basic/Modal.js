import React from 'react'
import styled from 'styled-components'
import { AiOutlineClose } from "react-icons/ai"
import { device } from "helpers/device";

const Container = styled.div`
    position: fixed;
    left: 0px;
    top:0px;
    width: 100vw;
    height: 100vh;
    z-index: var(--modal-index);
    display: ${props => props.show === true ? "block" : "none"};
`

const Mask = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background: rgba(210, 210, 210, 0.75);
    backdrop-filter: blur(28px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
`

const Content = styled.div`
    z-index: var(--modal-content-index);
    height: fit-content;
    box-shadow: 1px 1px 15px rgba(100,100,100,1);
    overflow: auto;
    background-color: var(--bg-color-1);
    @media ${device.desktop}{
        width: 800px;
        max-height: 96%;
        margin-top: 2vh;
        padding: 0px 0px 50px 0px;
    }

    @media ${device.tablet}{
        width: 600px;
        max-height: 96%;
        margin-top: 2vh;
        padding: 0px 0px 50px 0px;
    }

    @media ${device.mobile}{
        width: 100%;
        height: 100%;
        padding: 50px 0px 150px 0px;
    }
`

const CloseBtn = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--pink);
    box-shadow: 0px 2px 4px rgba(13, 11, 12, 0.2);

    @media ${device.desktop}{
        width: 45px;
        height: 45px;
        position: absolute;
        left: calc(50% + 418px);
        top: 2vh;
        border-radius: 8px;
    }

    @media ${device.tablet}{
        width: 45px;
        height: 45px;
        position: absolute;
        left: calc(50% + 310px);
        top: 2vh;
        border-radius: 8px;
    }

    @media ${device.mobile}{
        width: 100%;
        height: 40px;
        position: fixed;
        top:0px;
        left: 0px;
        z-index: calc(var(--modal-content-index) + 1);
    }

    &:hover{
        cursor: pointer;
    }
`

const CloseIcon = styled.div`
    font-size: 28px;
    color: var(--text-color-3);

    @media ${device.desktop}{
        font-size: 28px;
        height: 28px;
    }

    @media ${device.tablet}{
        font-size: 28px;
        height: 28px;
    }

    @media ${device.mobile}{
        font-size: 16px;
        height: 16px;
    }

`

const Modal = ({ children, show, setShow }) => {
    return (
        <Container show={show}>
            <Mask
            >
                <CloseBtn
                    onClick={() => { setShow(false) }}
                >
                    <CloseIcon>
                        <AiOutlineClose />
                    </CloseIcon>
                </CloseBtn>
                <Content>

                    {children}

                </Content>

            </Mask>
        </Container>
    )
}

export default Modal
