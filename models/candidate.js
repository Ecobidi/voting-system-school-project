const mongoose = require('mongoose')

let CandidateSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
  },
  position: {
    type: String,
    required: true,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'election'
  }
})

module.exports = mongoose.model('candidate', CandidateSchema)
