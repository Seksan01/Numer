const mongoose = require('mongoose')
const Schema = mongoose.Schema

let integral = new Schema(
    {
        Fx: { type: String, required: true },
        upper: { type: String, required: true },
        lower: { type: String, required: true },
        n: { type: String, required: true }
    },
)
module.exports = mongoose.model('intes', integral)