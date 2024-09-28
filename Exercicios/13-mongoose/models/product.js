import mongoose, { Types } from "mongoose"
import { Schema } from "mongoose"

const Product = mongoose.model(
    'Product',
    new Schema({
        name: {type: String, required: true},
        sku: {type: String, required: true},
        price: {type: Number, required: false},
        description: {type: String, required: false},
        featured_image: {type: String, required: false},
        galery: {type: [String], required: false}
        
    })
)

export default Product