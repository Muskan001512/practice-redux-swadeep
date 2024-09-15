import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createCategory = createAsyncThunk('createCategory', async (data) => {
    try {
        console.log(data)
        const response = await axios.post(`http://localhost:5000/private/category/create-category`, data)
        return response.data
    } catch (error) {
        return error
    }
})

export const getAllCategories = createAsyncThunk('getAllCategories', async ({ slug }) => {
    try {
        console.log(slug)
        const response = await axios.post(`http://localhost:5000/private/category/getAllCategories`, { slug })
        return response.data
    } catch (error) {
        return error
    }
})

export const getCategory = createAsyncThunk('getCategory', async (id) => {
    try {
        // console.log(slug)
        const response = await axios.get(`http://localhost:5000/private/category/${id}`)
        return response.data
    } catch (error) {
        return error
    }
})


export const deleteCategory = createAsyncThunk('deleteCategory', async (id) => {
    try {
        console.log(id)
        const response = await axios.delete(`http://localhost:5000/private/category/${id}`)
        return response.data
    } catch (error) {
        return error
    }
})

export const updateCategory = createAsyncThunk('updateCategory', async ({ id, values }) => {
    try {
        // console.log(slug, values, "peldo")
        const response = await axios.put(`http://localhost:5000/private/category/${id}`, values)
        return response.data
    } catch (error) {
        return error
    }
})


const categorySlice = createSlice({
    name: "categories",
    initialState: {
        loading: false,
        error: "",
        venueData: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllCategories.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllCategories.fulfilled, (state, action) => {
            state.loading = false
            console.log(action?.payload)
            state.venueData = action?.payload?.status ? action.payload.venue : {}
        })
        builder.addCase(getAllCategories.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(createCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(createCategory.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(deleteCategory.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(getCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getCategory.rejected, (state) => {
            state.loading = true
        })
        builder.addCase(updateCategory.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateCategory.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(updateCategory.rejected, (state) => {
            state.loading = true
        })
    }
})

export default categorySlice.reducer
