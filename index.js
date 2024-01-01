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

const storage = multer.diskStorage({ 
    destination: (_, __, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (_, file, cb) => { 
        cb(null, file.originalname) 
    }, 
});

const upload = multer({ storage });

app.use(express.json()); 
app.use(cors());
app.use('/uploads', express.static('uploads')); 

//media upload pathes
app.post('/upload', adminOnlyAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});