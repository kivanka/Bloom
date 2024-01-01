import OrderModel from '../models/order.js';

export const createOrder = async (req, res) => {
    try {
        const newOrder = new OrderModel({
            products: req.body.products,
            total: req.body.total
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate('products');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.id).populate('products');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                products: req.body.products,
                total: req.body.total
            },
            { new: true }
        ).populate('products');
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
