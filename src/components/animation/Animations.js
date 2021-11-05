import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styled from 'styled-components';

const Container = styled.div`
    width: 40px;
    height: 40px;
`

const animations = {
    imageLoading: { data: require("./image-loading.json"), id: "image-loading" },
    empty: { data: require("./empty.json"), id: "empty" },
    searching: { data: require("./searching-animation.json"), id: "searching" },
    gps: { data: require("./gps-animation.json"), id: "gps" },
    loading: { data: require("./loading_TW.json"), id: "loading" }
}


const ImageLoading = ({ className, speed = 1, style }) => {
    return (
        <Animation style={style} className={className} animation={animations.imageLoading} speed={speed} />
    )
}

const Empty = ({ className, speed = 1, style }) => {
    return (
        <Animation style={style} className={className} animation={animations.empty} speed={speed} />
    )
}

const Searching = ({ className, speed = 1, style }) => {
    return (
        <Animation style={style} className={className} animation={animations.searching} speed={speed} />
    )
}

const GPS = ({ className, speed = 1, style }) => {
    return (
        <Animation style={style} className={className} animation={animations.gps} speed={speed} />
    )
}

const Loading = ({ className, speed = 1, style }) => {
    return (
        <Animation style={style} className={className} animation={animations.loading} speed={speed} />
    )
}


const Animation = ({ animation, speed = 1, className, style }) => {

    const container = useRef(null)

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animation.data,
        })

        lottie.setSpeed(speed)
    }, [])


    return (
        <Container style={style} className={className} id={animation.id} ref={container}></Container>
    )
}


export {
    ImageLoading,
    Empty,
    Searching,
    GPS,
    Loading
}
