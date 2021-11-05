import { configureStore } from "@reduxjs/toolkit"
import positionSlice from "slice/positionSlice"

export default configureStore({
    reducer: {
        position: positionSlice
    }
})