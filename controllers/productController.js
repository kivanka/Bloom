import ProductModel from '../models/product.js';

export const create = async (req, res) => {
    try {
        const doc = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.tables,
            imageUrl: req.body.imageUrl,
            categories: req.body.categories,
        });

        const product = await doc.save();

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Create attempt failed',
        });
    }
};

export const update = async (req, res) => {
    try {
        const productId = req.params.id;

        await ProductModel.updateOne(
            {
                _id: productId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.tables,
                imageUrl: req.body.imageUrl,
                categories: req.body.categories,
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

export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;

        const doc = await ProductModel.findById(productId);

        if (doc) {
            res.json(doc);
        } else {
            res.status(404).json({ message: 'Prodcuct not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Search attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const products = await ProductModel.find();

        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve products',
        });
    }
};