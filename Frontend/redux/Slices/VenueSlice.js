import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getVenue = createAsyncThunk('getVenue', async (slug) => {
    try {
        console.log(slug)
        const response = await axios.get(`http://localhost:5000/private/venues/${slug}`)
        return response.data
    } catch (error) {
        return error
    }
})

export const getAllVenues = createAsyncThunk('getAllVenues', async () => {
    try {
        const response = await axios.get(`http://localhost:5000/private/venues/get-all-venues`)
        return response.data
    } catch (error) {
        return error
    }
})

export const deleteVenue = createAsyncThunk('deleteVenue', async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/private/venues/${id}`)
        return response.data
    } catch (error) {
        return error
    }
})

export const updateVenue = createAsyncThunk('updateVenue', async ({ slug, values }) => {
    try {
        console.log(slug, values, "peldo")
        const response = await axios.put(`http://localhost:5000/private/venues/${slug}`, values)
        return response.data
    } catch (error) {
        return error
    }
})


const venueSlice = createSlice({
    name: "venues",
    initialState: {
        loading: false,
        error: "",
        venueData: {},
        activeVenue: {}
    },
    reducers: {
        setActiveVenue: (state, action) => {
            state.activeVenue = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(getVenue.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getVenue.fulfilled, (state, action) => {
            state.loading = false
            console.log(action?.payload)
            state.venueData = action?.payload?.status ? action.payload.venue : {}
        })
        builder.addCase(getVenue.rejected, (state, action) => {
            state.loading = true
            console.log(action, "action")
            state.error = action.payload
        })
        builder.addCase(getAllVenues.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllVenues.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getAllVenues.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(deleteVenue.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteVenue.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(deleteVenue.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(updateVenue.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateVenue.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateVenue.rejected, (state) => {
            state.loading = true
        })
    }
})

export default venueSlice.reducer
export const { setActiveVenue } = venueSlice.actions
