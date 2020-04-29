// Portion of code and site file structure based on Web Dev Simplified's video on YouTube and Kristen Hunter's course from Lynda.com
// CRUD operations information from CodAffection
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const artistRouter = require('./routes/artists')
const songRouter = require('./routes/songs')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Get the server to run and return a message if it is successful
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('You are connected to Mongoose!'))

// located in "routes" folder
app.use('/', indexRouter)
app.use('/artists', artistRouter)
app.use('/songs', songRouter)

// localhost:3000
app.listen(process.env.PORT || 3000)