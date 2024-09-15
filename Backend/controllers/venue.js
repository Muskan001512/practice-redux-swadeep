import { Venue } from "../models/venue.js";
import { uploadImages } from "../utils/utility.js";

export const getAllVenues = async (req, res) => {
    try {
        const venueList = await Venue.find();
        return { status: 1, count: venueList?.length, venueList };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};

export const getVenue = async (req, res) => {
    const { id } = req.params;
    console.log(req?.params)
    try {
        const venue = await Venue.findOne({ slug: id });
        return { status: 1, venue };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};

export const deleteVenue = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedVenue = await Venue.findByIdAndDelete(id);
        return { status: 1, deletedVenue };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};

export const createVenue = async (req, res) => {
    try {
        console.log(req.body)
        const path = uploadImages(req, res)
        console.log(path, "path")
        const { name, slug, currency, theme, color, tags, createdBy } = req.body;
        console.log(name, slug, currency, theme, color, tags, createdBy)
        const venue = await Venue.create({ name, slug, currency, theme, color, tags, imagePath: path || "", createdBy });
        return { status: 1, message: "Venue created successfully", venue };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};

export const updateVenue = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, "id")
        const { name, slug, currency, theme, color, tags } = req.body;
        console.log("object", req?.body)
        console.log({ name, slug, currency, theme, color, tags });
        const venue = await Venue.findOneAndUpdate({ slug: id }, { name, slug, currency, theme, color, tags });
        return { status: 1, message: "Venue updated successfully", venue };
    } catch (error) {
        return { status: 0, message: error.message };
    }
};
