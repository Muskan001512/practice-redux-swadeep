import { model, Schema } from "mongoose";
import { commonSchema } from "../utils/utility";

const productSchema = new Schema({
    name: commonSchema,
    price: { ...commonSchema, type: Number },
    description: commonSchema,
    images: {
        type: Array,
        default: [],
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
})

export const Product = model("Product", productSchema)
