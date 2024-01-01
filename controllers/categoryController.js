import CategoryModel from '../models/category.js'; // Adjust the path as necessary

export const createCategory = async (req, res) => {
    try {
        const category = new CategoryModel({
            Name: req.body.name
        });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            { Name: req.body.name },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndRemove(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};