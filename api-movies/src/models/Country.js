const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema (
    {
        _id: { 
            type: String, 
            required: true, 
            unique: true,
        },
        name: { type: String, required: true },
        languages : { type: String, required: true }
    },
    { timestamps: true } // Created at and updated at
)

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;