import express from "express"
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.js"

const app = express()

app.post("/create-category", async (req, res) => {
    try {
        let response = await createCategory(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

app.post("/getAllCategories", async (req, res) => {
    try {
        let response = await getAllCategories(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

app.get("/:id", async (req, res) => {
    try {
        let response = await getCategory(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}).put("/:id", async (req, res) => {
    try {
        let response = await updateCategory(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}).delete("/:id", async (req, res) => {
    try {
        console.log("object")
        console.log(req.params)
        let response = await deleteCategory(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})



export default app;