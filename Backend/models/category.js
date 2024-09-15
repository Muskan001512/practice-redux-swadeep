import { Schema, SchemaTypes, model } from "mongoose";
import { commonSchema, commonUniqueSchema } from "../utils/utility.js";

const categorySchema = Schema({
    name: commonUniqueSchema,
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    slug: commonSchema,
    venue: {
        type: SchemaTypes.ObjectId,
        ref: "Venue",
        required: true
    }
})

const Category = model('Categories', categorySchema)
export default Category