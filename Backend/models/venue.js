import mongoose from "mongoose";
import { commonSchema, commonUniqueSchema } from "../utils/utility.js";

const venueSchema = new mongoose.Schema({
    name: commonUniqueSchema,
    slug: commonUniqueSchema,
    currency: commonSchema,
    theme: commonSchema,
    color: commonSchema,
    tags: commonSchema,
    imagePath: { type: String },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        required: true
    }
})

export const Venue = mongoose.model("Venue", venueSchema)