import { createSlice } from "@reduxjs/toolkit";


const hotelSlice = createSlice({
    name: "hotel",
    initialState: {
        coord: null,
        gpsEnable: null,
    },
    reducers: {
        setCoord: (state, action) => {
            state.coord = action.payload
        },
        setGpsEnable: (state, action) => {
            state.gpsEnable = action.payload
        }
    }
})

export const {
    setCoord,
    setGpsEnable
} = hotelSlice.actions;

export const selectCoord = (state) => state.position.coord
export const selectGpsEnable = (state) => state.position.gpsEnable

export default hotelSlice.reducer

