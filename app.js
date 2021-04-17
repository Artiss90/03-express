const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(logger('dev'))

app.use('/weather', require('./routes/api/weather'))

app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
