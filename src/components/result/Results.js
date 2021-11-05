import React from 'react'
import { ActivityResultByPosition, ActivityResultBySearch } from 'components/result/ActivityResult';
import { HotelsResultBySearch, HotelsResultByPosition } from 'components/result/HotelsResult';
import { ScenicSpotsResultByPosition, ScenicSpotsResultBySearch } from 'components/result/ScenicSpotsResult';
import { RestaurantsResultByPosition, RestaurantsResultBySearch } from 'components/result/RestaurantsResult';

const ResultBySearch = ({ category, city, keyword, slice, show = true, title, enablePageChange = false }) => {
    switch (category) {
        case "restaurant":
            return (
                <RestaurantsResultBySearch
                    show={show}
                    city={city}
                    keyword={keyword}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        case "hotel":
            return (
                <HotelsResultBySearch
                    show={show}
                    city={city}
                    keyword={keyword}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        case "activity":
            return (
                <ActivityResultBySearch
                    show={show}
                    city={city}
                    keyword={keyword}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        case "scenicSpot":
            return (
                <ScenicSpotsResultBySearch
                    show={show}
                    city={city}
                    keyword={keyword}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        default:
            return (<>
            </>);
    }
}

const ResultByPosition = ({ category, lat, lon, distance, slice, show = true, title, enablePageChange = false }) => {
    switch (category) {
        case "restaurant":
            return (
                <RestaurantsResultByPosition
                    show={show}
                    lat={lat}
                    lon={lon}
                    distance={distance}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        case "hotel":
            return (
                <HotelsResultByPosition
                    show={show}
                    lat={lat}
                    lon={lon}
                    distance={distance}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        case "activity":
            return (
                <ActivityResultByPosition
                    show={show}
                    lat={lat}
                    lon={lon}
                    distance={distance}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        case "scenicSpot":
            return (
                <ScenicSpotsResultByPosition
                    show={show}
                    lat={lat}
                    lon={lon}
                    distance={distance}
                    slice={slice}
                    title={title}
                    category={category}
                    enablePageChange={enablePageChange}
                />)
        default:
            return (<></>);
    }
}

export {
    ResultBySearch,
    ResultByPosition
}