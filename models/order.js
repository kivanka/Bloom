import mongoose from "mongoose";

const OrderSchema = new Schema({
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    total: {
        type: Number
    }
});

const Order = mongoose.model('Order', OrderSchema);