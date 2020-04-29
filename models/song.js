const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Artist'
  }
})

module.exports = mongoose.model('Song', songSchema)