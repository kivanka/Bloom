import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name: {
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
        imageUrl: String,
        categories: [
            {
                type: Schema.Types.String,
                ref: 'Category',
            }
        ],
    },
);

export default mongoose.model('Product', ProductSchema);