const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        Fx: { type: String, required: true },
        XL: { type: Number, required: true },
        XR: { type: Number, required: true },
    },
    { timestamps: true },
)
module.exports = mongoose.model('movies', Movie)