import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/login", data)
        return response.data
    } catch (error) {
        return error
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        data: [],
        error: "",
        userData: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(userLogin.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = true
            console.log(action, "action")
            state.error = action?.payload
            state.userData = action?.payload?.status ? action?.payload?.user : {}
        })
    }
})

export default authSlice.reducer