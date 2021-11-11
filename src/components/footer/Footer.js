import React from 'react'
import styled from 'styled-components'
import { deviceMedia } from "helpers/device";
import Switch from 'components/basic/Switch';
import { AiFillMail, AiFillGithub, AiFillLinkedin } from "react-icons/ai"

const Container = styled.div`
    width: 100%;
    color:var(--text-color-1);
    background-color: var(--bg-color-2);
    display: grid;
    @media ${deviceMedia.desktop}{
        height: var(--desktop-footer-height);
        height: var(--tablet-footer-height);
        grid-template-columns: 1fr;
        grid-gap: 10px;
        padding:10px 0px 30px 0px;
    }

    @media ${deviceMedia.tablet} {
        height: var(--tablet-footer-height);
        grid-template-columns: 1fr;
        grid-gap: 10px;
        padding:10px 0px 30px 0px;
    }

    @media ${deviceMedia.mobile}{
        height: var(--mobile-footer-height);
        grid-template-columns: 1fr;
        grid-gap: 5px;
        justify-items: center;
        padding:10px 0px 30px 0px;
    }
`

const Contact = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`


const Info = styled.div`
   display: flex;
    align-items: center;
    justify-content: center;
`

const Link = styled.a`
    width: 32px;
    height: 32px;
    font-size: 32px;
    margin: 0px 10px;
    color:var(--text-color-1);
`

const DarkInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Footer = ({ changeDarkModel, darkModeEnabled }) => {
    return (
        <Container>
            <Info>
                Taiwan Tourguide  © Code: Sean  /  Design: KT
            </Info>
            <Contact>
                <Link href="mailto:a09342712201@google.com">
                    <AiFillMail />
                </Link>
                <Link href="https://github.com/SinHongChen">
                    <AiFillGithub />
                </Link>
                <Link href="http://linkedin.com/in/信宏-陳-2a52a6206">
                    <AiFillLinkedin />
                </Link>
            </Contact>
            <DarkInfo>
                <span>開啟夜間模式</span>&nbsp;&nbsp;&nbsp;&nbsp;<Switch defaultStatus={darkModeEnabled} callback={(value) => { changeDarkModel(value) }} />
            </DarkInfo>
        </Container>
    )
}

export default Footer
