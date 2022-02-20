require('dotenv').config()

const express = require('express')
const app = express()
// const port = process.env.PORT || 3000

const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const indexRouter = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use(errorHandler)

module.exports = app

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })