const mongoose = require('mongoose')
const Schema = mongoose.Schema

let diff = new Schema(
    {
        Fx: { type: String, required: true },
        d: { type: String, required: true },
        h: { type: String, required: true },
        x: { type: String, required: true },
    },
)
module.exports = mongoose.model('diffs', diff)