const mongoose = require('mongoose')

let PartySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  motto: {
    type: String,
  },
  photo: {
    type: String,
  }
})

module.exports = mongoose.model('party', PartySchema)