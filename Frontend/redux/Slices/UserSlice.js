import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    try {
        const response = await axios.get("http://localhost:5000/private/users/get-all-users")
        return response.data
    } catch (error) {
        return error
    }
})

export const createUser = createAsyncThunk("createUser", async (data) => {
    try {
        console.log(data)
        const response = await axios.post("http://localhost:5000/private/users/create-user", data)
        console.log(response, "response")
        return response.data
    } catch (error) {
        return error
    }
})

const userSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        data: [],
        error: ""
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = true
            console.log(action, "action")
            state.error = action.payload
        })
        builder.addCase(createUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = true
            console.log(action, "action")
            state.error = action.payload
        })
    }
})

export default userSlice.reducer