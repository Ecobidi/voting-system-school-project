const mongoose = require('mongoose')

let AlreadyVotedSchema = new mongoose.Schema({
  unique_voting_id: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('alreadyVoted', AlreadyVotedSchema)