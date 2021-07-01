const mongoose = require('mongoose')

let VoterSchema = new mongoose.Schema({
  unique_voting_id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: 'nacos'
  }
})

module.exports = mongoose.model('voter', VoterSchema)
