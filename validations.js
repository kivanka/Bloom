import { body, param } from 'express-validator';

//auth validation
export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password shoud be at least 5 symbols').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password should be at least 8 symbols').isLength({ min: 8 }),
    body('userName', 'Name is too short').isLength({ min: 2 }),
    body('role', 'Invalid role').custom((value) => {
        const roles = ['user', 'admin'];
        if (!roles.includes(value)) {
            throw new Error('Invalid role');
        }
        return true;
    }),
];

//products
export const createProductValidation = [
    body('name', 'Product name is required').notEmpty(),
    body('description', 'Product description is required').notEmpty(),
    body('price', 'Product price must be a number').isNumeric(),
    body('imageUrl', 'Invalid URL format for image').optional().isURL(),
    body('categories', 'Categories must be an array').optional().isArray(),
    body('categories.*', 'Invalid category ID').optional().isMongoId(),
];

export const updateProductValidation = [
    body('name', 'Product name is required').optional().notEmpty(),
    body('description', 'Product description is required').optional().notEmpty(),
    body('price', 'Product price must be a number').optional().isNumeric(),
    body('imageUrl', 'Invalid URL format for image').optional().isURL(),
    body('categories', 'Categories must be an array').optional().isArray(),
    body('categories.*', 'Invalid category ID').optional().isMongoId(),
];

//orders
export const createOrderValidation = [
    body('products', 'Products must be an array').isArray(),
    body('products.*', 'Each product ID must be a valid MongoID').isMongoId(),
    body('total', 'Total must be a number').isNumeric(),
];

export const updateOrderValidation = [
    body('products', 'Products must be an array').optional().isArray(),
    body('products.*', 'Each product ID must be a valid MongoID').optional().isMongoId(),
    body('total', 'Total must be a number').optional().isNumeric(),
];

//categorys
export const createCategoryValidation = [
    body('name', 'Category name is required').notEmpty(),
    body('name', 'Category name must not exceed 32 characters').isLength({ max: 32 }),
];

export const updateCategoryValidation = [
    param('id', 'Invalid category ID').isMongoId(),
    body('name', 'Category name must not exceed 32 characters').optional().isLength({ max: 32 }),
];