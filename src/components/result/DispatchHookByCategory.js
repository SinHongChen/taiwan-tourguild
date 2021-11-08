import useRestaurant from 'hook/useRestaurant';
import useActivity from 'hook/useActivity';
import useHotel from 'hook/useHotel';
import useScenicSpot from 'hook/useScenicSpot';

const DispatchHookByCategory = (category) => {
    const restaurant = useRestaurant([]);
    const activity = useActivity([]);
    const hotel = useHotel([]);
    const scenicSpot = useScenicSpot([]);

    function getSkip() {
        switch (category) {
            case "restaurant":
                return restaurant.skip;
            case "hotel":
                return hotel.skip;
            case "activity":
                return activity.skip;
            case "scenicSpot":
                return scenicSpot.skip;
            default:
        }
    }

    function updateSkip(skip) {
        switch (category) {
            case "restaurant":
                return restaurant.setSkip(skip);
            case "hotel":
                return hotel.setSkip(skip);
            case "activity":
                return activity.setSkip(skip);
            case "scenicSpot":
                return scenicSpot.setSkip(skip);
            default:
        }
    }

    async function getResultDataByClass(className, sliceExtraNumber, skip) {
        switch (category) {
            case "restaurant":
                return await restaurant.getRestaurantsByClass(className, sliceExtraNumber, skip);
            case "hotel":
                return await hotel.getHotelsByClass(className, sliceExtraNumber, skip);
            case "activity":
                return await activity.getActivityInfosByClass(className, sliceExtraNumber, skip);
            case "scenicSpot":
                return await scenicSpot.getScenicSpotsByClass(className, sliceExtraNumber, skip);
            default:
        }
    }

    async function getResultDataByPosition(lat, lon, distance, sliceExtraNumber, skip) {
        switch (category) {
            case "restaurant":
                return await restaurant.getRestaurantsByPosition(lat, lon, distance, sliceExtraNumber, skip);
            case "hotel":
                return await hotel.getHotelsByPosition(lat, lon, distance, sliceExtraNumber, skip);
            case "activity":
                return await activity.getActivityInfosByPosition(lat, lon, distance, sliceExtraNumber, skip);
            case "scenicSpot":
                return await scenicSpot.getScenicSpotsByPosition(lat, lon, distance, sliceExtraNumber, skip);
            default:
        }
    }

    async function getResultDataBySearch(city, keyword, sliceExtraNumber, currentSkip) {
        switch (category) {
            case "restaurant":
                return await restaurant.getRestaurantsBySearch(city, keyword, sliceExtraNumber, currentSkip);
            case "hotel":
                return await hotel.getHotelsBySearch(city, keyword, sliceExtraNumber, currentSkip);
            case "activity":
                return await activity.getActivityInfosBySearch(city, keyword, sliceExtraNumber, currentSkip);
            case "scenicSpot":
                return await scenicSpot.getScenicSpotsBySearch(city, keyword, sliceExtraNumber, currentSkip);
            default:
        }
    }

    function updateResultData(data) {
        switch (category) {
            case "restaurant":
                return restaurant.setRestaurants(data);
            case "hotel":
                return hotel.setHotels(data);
            case "activity":
                return activity.setActivityInfos(data);
            case "scenicSpot":
                return scenicSpot.setScenicSpots(data);
            default:
        }
    }

    function getCurrentResultData() {
        switch (category) {
            case "restaurant":
                return restaurant.restaurants;
            case "hotel":
                return hotel.hotels;
            case "activity":
                return activity.activityInfos;
            case "scenicSpot":
                return scenicSpot.scenicSpots;
            default:
        }
    }


    return {
        updateSkip,
        getResultDataByPosition,
        getResultDataBySearch,
        updateResultData,
        getCurrentResultData,
        getResultDataByClass,
        getSkip
    }
}

export default DispatchHookByCategory;