import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
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

export default mongoose.model('Order', OrderSchema);