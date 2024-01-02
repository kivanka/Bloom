import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        purchaseDate: {
            type: Date,
            default: Date.now
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            }
        ],
        total: {
            type: Number
        }
    });

const Order = mongoose.model('Order', OrderSchema);

export { OrderSchema };
export default Order;