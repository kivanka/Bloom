import mongoose from "mongoose";

const CategorySchema = new Schema({
    Name: {
        type: String,
        required: true,
        maxlength: 32,
    },
});

module.exports = model('Category', CategorySchema);