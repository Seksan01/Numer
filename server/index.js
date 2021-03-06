const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const NumerRouter = require('./routes/Numer')

const app = express()
const apiPort = 9000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', NumerRouter)


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))