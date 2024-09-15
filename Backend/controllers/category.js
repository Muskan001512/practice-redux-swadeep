import Category from "../models/category.js";
import { Venue } from "../models/venue.js";

export const createCategory = async (req, res) => {
    try {
        const { name, status, slug } = req?.body;
        let venue = await Venue?.findOne({ slug })
        console.log(venue)
        if (venue && venue?._id) {
            const category = await Category.create({
                name, status, venue: venue?._id, slug
            })
            console.log(category, "category")
            return { status: 1, category, message: "Category Created Successfully" };
        } else {
            return { status: 0, message: "Venue Not Found" }
        }
    } catch (error) {
        return { status: 0, message: error?.message };
    }
}

export const getAllCategories = async (req, res) => {
    try {
        // const { name, status, slug } = req?.body;
        console.log(req?.body)
        const { slug } = req?.body;
        console.log(slug)
        let categories = await Category.find({ slug })
        if (categories?.length) {
            return { status: 1, categories, message: "Categories Retrieved Successfully" };
        } else {
            return { status: 0, message: "No Categories Found" }
        }
    } catch (error) {
        return { status: 0, message: error?.message };
    }
}

export const getCategory = async (req, res) => {
    try {
        const { id } = req?.params;
        const category = await Category.findById(id)
        if (category) {
            return { status: 1, category, message: "Category Found Successfully" }
        } else {
            return { status: 0, message: "Category Not Found" }
        }

    } catch (error) {
        return { status: 0, message: error?.message };
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req?.params;
        const category = await Category.findByIdAndDelete(id)
        if (category) {
            return { status: 1, message: "Category Deleted Successfully" }
        } else {
            return { status: 0, message: "Category Not Found" }
        }

    } catch (error) {
        return { status: 0, message: error?.message };
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req?.params;
        const { name, status, slug } = req?.body;
        const category = await Category.findByIdAndUpdate(id, { name, status, slug })
        if (category) {
            return { status: 1, category, message: "Category Updated Successfully" }
        }
    } catch (error) {
        return { status: 0, message: error?.message };
    }
}