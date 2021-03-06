const mongoose = require('mongoose')
const Schema = mongoose.Schema

let newton = new Schema(
    {
        Fx: { type: String, required: true },
        XL: { type: String, required: true },
        XR: { type: String, required: true },
    },
)
module.exports = mongoose.model('newtons', newton)