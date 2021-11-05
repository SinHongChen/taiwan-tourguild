import { createSlice } from "@reduxjs/toolkit";


const positionSlice = createSlice({
    name: "position",
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
} = positionSlice.actions;

export const selectCoord = (state) => state.position.coord
export const selectGpsEnable = (state) => state.position.gpsEnable

export default positionSlice.reducer

