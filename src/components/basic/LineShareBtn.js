import styled from "styled-components"

const Container = styled.a`
    margin:0px 5px;
    height: 25px;

`

const LineShareImage = styled.img`
    height: 25px;
    width: auto;
`

const LineShareButton = ({ shareUrl, className }) => {
    return (
        <Container href={`https://lineit.line.me/share/ui?url=${encodeURIComponent(shareUrl)}`} className={className} >
            <LineShareImage src="./Icons/social/lineshare.png" />
        </Container>
    )
}

export default LineShareButton;
