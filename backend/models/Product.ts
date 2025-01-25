import mongoose, {Schema} from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please choose a category'],
    },
    sellerInfo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a seller info'],
    }
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;