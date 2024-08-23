import express from "express"
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js"

const app = express()

app.get("/all", async (req, res) => {
    try {
        let response = await getAllUsers(req, res)
        res.send({ status: 1, response })
    } catch (error) {
        res.send(error)
    }
})

app.get("/:id", async (req, res) => {
    try {
        let response = await getUser(req, res)
        res.send({ status: 1, response })
    } catch (error) {
        res.send(error)
    }
}).delete("/:id", async (req, res) => {
    try {
        let response = await deleteUser(req, res)
        res.send({ status: 1, response })
    } catch (error) {
        res.send(error)
    }
}).put("/:id", async (req, res) => {
    try {
        console.log("object")
        let response = await updateUser(req, res)
        res.send({ status: 1, response })
    } catch (error) {
        res.send(error)
    }
})

app.post("/create-user", async (req, res) => {
    try {
        let response = await createUser(req, res)
        console.log(response?.status)
        res.send(response?.status ? { status: 1, response } : response)
        // (response?.status) ? res.send({ status: 1, response }) : res.send(response)
    } catch (error) {
        res.send(error)
    }
})
export default app;