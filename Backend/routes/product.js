import express from "express"
import { uploadMultipleImages } from "../utils/utility"

const app = express()

app.post('/create-product', async (req, res) => {
    try {
        const paths = uploadMultipleImages(req, res)
        console.log(paths)
    } catch (error) {
        return error
    }
})