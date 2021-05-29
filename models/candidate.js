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
  gender: {
    type: String,
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  position: {
    type: String,
    required: true,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'election'
  },
  photo: {
    type: String,
  }
})

module.exports = mongoose.model('candidate', CandidateSchema)
