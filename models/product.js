import mongoose from "mongoose";

const ProductSchema = new Schema(
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
        featured: {
            type: Boolean,
            default: false
        },
        seasonal: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = model('Product', ProductSchema);