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
                ref: 'Product'
            }
        ],
        total: {
            type: Number
        }
    });

const Order = mongoose.model('Order', OrderSchema);

export { OrderSchema }; // Export the schema
export default Order; // Keep the default export for the model