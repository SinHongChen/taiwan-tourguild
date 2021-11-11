import { createSlice } from "@reduxjs/toolkit";
import useHotel from "hook/useHotel";
import useRestaurant from "hook/useRestaurant";
import useActivity from "hook/useActivity";
import useScenicSpot from "hook/useScenicSpot";

const tdxSlice = createSlice({
    name: "position",
    initialState: {
        hotel: useHotel,
        restaurant: useRestaurant,
        activity: useActivity,
        scenicSpot: useScenicSpot
    },
    reducers: {
    }
})

export const {
} = tdxSlice.actions;

export const selectHotel = (state) => state.position.coord
export const selectRestaurant = (state) => state.position.gpsEnable
export const selectActivity = (state) => state.position.gpsEnable
export const selectScenicSpot = (state) => state.position.gpsEnable

export default tdxSlice.reducer

