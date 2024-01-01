import express from 'express';
import mongoose from 'mongoose'; 
import multer from 'multer';
import cors from 'cors';

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