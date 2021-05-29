const mongoose = require('mongoose')

let BallotSchema = new mongoose.Schema({
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'election',
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
  },
  position: {
    type: String,
  },
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'voter',
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('ballot', BallotSchema)