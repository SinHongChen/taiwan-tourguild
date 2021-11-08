import styled from "styled-components"

const Container = styled.a`
    margin:0px 5px;
    display: grid;
    align-items: center;
    grid-template-columns: 24px 1fr;
    height: 25px;
    text-decoration: none;
    padding: 0px 10px 0px 3px;
    border-radius: 0.2em;
    background-color: #3b5998;
`

const LineShareImage = styled.img`
    height: 16px;
    width: auto;
    display: block;
    background-color: white;
`

const Title = styled.span`
    color: white;
    font-size: 12px;
    font-weight: bold;
`

const FacebookShareBtn = ({ shareUrl, className }) => {
    return (
        <Container target="_blank" href={`https://www.facebook.com/sharer/sharer.php?href=${shareUrl}`} className={className} >
            <LineShareImage src="./Icons/social/facebook.png" />
            <Title>分享</Title>
        </Container>
    )
}

export default FacebookShareBtn;
