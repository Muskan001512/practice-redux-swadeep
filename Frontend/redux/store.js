import { configureStore } from "@reduxjs/toolkit"
import user from "./Slices/UserSlice"
import venue from "./Slices/VenueSlice"
import auth from "./Slices/AuthSlice"
const store = configureStore({
    reducer: {
        user: user,
        venue: venue,
        auth: auth
    }
})

export default store