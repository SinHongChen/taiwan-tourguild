import React from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import styled from 'styled-components';
import { useEffect } from 'react';


//#region styled component

const Container = styled.div`
    width: 100%;
    height: 400px;
`

//#endregion

const GoogleMap = ({ lat, lon }) => {
    const loader = new Loader({
        apiKey: "AIzaSyBDfKTaMuhSymeau0l-vodE-2v-ZSzYU04",
        version: "weekly",
    });

    useEffect(() => {
        loader.load().then(
            (google) => {
                new google.maps.Map(document.getElementById("map-container"), {
                    center: { lat: lat, lng: lon },
                    zoom: 18
                });
            }).catch((err) => {
                console.error(err)
            })
    }, [lat, lon])


    return (
        <Container id="map-container" />
    )
}

export default GoogleMap
