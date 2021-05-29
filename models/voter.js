const mongoose = require('mongoose')

let VoterSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
  },
  resident_address: String,
  resident_city: String,
  resident_state: String,
  origin_lga: String,
  origin_state: String,
  gender: {
    type: String,
  },
  photo: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('voter', VoterSchema)
