import express from 'express'
import { createVenue, deleteVenue, getAllVenues, getVenue, updateVenue } from '../controllers/venue.js'

const app = express()

app.post("/create-venue", async (req, res) => {
    try {
        const response = await createVenue(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

app.get("/get-all-venues", async (req, res) => {
    try {
        const response = await getAllVenues(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

app.get("/:id", async (req, res) => {
    try {
        console.log(req?.params, "route")
        let response = await getVenue(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}).delete("/:id", async (req, res) => {
    try {
        let response = await deleteVenue(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
}).put("/:id", async (req, res) => {
    try {
        console.log("object")
        let response = await updateVenue(req, res)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

export default app;