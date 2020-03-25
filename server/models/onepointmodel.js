const mongoose = require('mongoose')
const Schema = mongoose.Schema

let onepoint = new Schema(
    {
        Fx: { type: String, required: true },
        x: { type: String, required: true },

    },
)
module.exports = mongoose.model('onepoints', onepoint)