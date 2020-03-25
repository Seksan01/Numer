
const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://admin:admin1234@cluster0-pmu2p.mongodb.net/Numer', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db