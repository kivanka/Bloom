import OrderModel from '../models/order.js';

export const create = async (req, res) => {
    try {
        const doc = new OrderModel({
            products: req.body.products,
            total: req.body.total,
        });

        const order = await doc.save();

        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Create attempt failed', error: err });
    }
};

export const getAll = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate('products');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getOne = async (req, res) => {
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

export const update = async (req, res) => {
    try {
        const orderId = req.params.id;

        await OrderModel.updateOne(
            {
                _id: orderId,
            },
            {
                products: req.body.products,
                total: req.body.total,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Update attempt failed',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await OrderModel.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'order not found' });
        }

        res.json({ message: 'order successfully deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Delete attempt failed' });
    }
};
