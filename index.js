import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { 
    UserController,
    ProductController,
    OrderController,
    CategoryContoller,
} from './controllers/index.js';

import { 
    loginValidation,
    registerValidation,
    createProductValidation,
    updateProductValidation,
    createOrderValidation,
    updateOrderValidation,
    createOrUpdateCategoryValidation,
    updateCategoryValidation,
} from './validations.js';

import { 
    handleValidationErrors,
    allRolesAuth,
    adminOnlyAuth,
} from './utils/index.js';

mongoose
    .connect('mongodb+srv://admin:He12345678@cluster0.k6wg7rw.mongodb.net/?retryWrites=true&w=majority/Bloom')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});