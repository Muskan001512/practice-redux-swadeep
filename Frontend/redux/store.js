import { configureStore } from "@reduxjs/toolkit"
import user from "./Slices/UserSlice"
const store = configureStore({
    reducer: {
        user: user
    }
})

export default store