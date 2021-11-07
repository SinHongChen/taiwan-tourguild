import React from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import styled from 'styled-components';
import { useEffect } from 'react';

const Container = styled.div`
    width: 100%;
    height: 400px;
`



const GoogleMap = ({ coord }) => {
    const loader = new Loader({
        apiKey: "AIzaSyBDfKTaMuhSymeau0l-vodE-2v-ZSzYU04",
        version: "weekly",
    });

    useEffect(() => {
        loader.load().then(
            (google) => {
                new google.maps.Map(document.getElementById("map-container"), {
                    center: { lat: coord.lat, lng: coord.lon },
                    zoom: 18
                });
            }).catch((err) => {
                console.error(err)
            })
    }, [coord])


    return (
        <Container id="map-container">

        </Container>
    )
}

export default GoogleMap
