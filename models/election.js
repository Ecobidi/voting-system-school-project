const mongoose = require('mongoose')

let PositionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
})

let ElectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'inactive',
  },
  done: {
    type: Boolean,
  },
  photo: {
    type: String,
  },
  positions: [PositionSchema]
})

module.exports = mongoose.model('election', ElectionSchema)