import React from 'react'
import { useEffect } from 'react';
import ActivityDetail from './ActivityDetail';
import HotelDetail from './HotelDetail';
import RestaurantDetail from './RestaurantDetail';
import ScenicSpotDetail from './ScenicSpotDetail';

const Details = ({ category, id }) => {

    switch (category) {
        case "restaurant":
            return <RestaurantDetail id={id} />;
        case "hotel":
            return <HotelDetail id={id} />;
        case "scenicSpot":
            return <ScenicSpotDetail id={id} />;
        case "activity":
            return <ActivityDetail id={id} />;
        default:
            return <></>;
    }
}

export default Details
