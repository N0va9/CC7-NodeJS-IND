const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        originalName: {
            type: String,
            required: true,
        },
        mimeType: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
    },
    { _id: false }

);

module.exports = fileSchema;