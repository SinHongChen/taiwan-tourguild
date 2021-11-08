import React from 'react'
import LineShareButton from 'components/basic/LineShareBtn';
import FacebookShareBtn from 'components/basic/FacebookShareBtn';
import styled from 'styled-components';

const Container = styled.div`
    margin:20px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const ShareLinkbar = ({ shareUrl }) => {
    return (
        <Container>
            <LineShareButton shareUrl={shareUrl} />
            <FacebookShareBtn shareUrl={shareUrl} />
        </Container>
    )
}

export default ShareLinkbar
