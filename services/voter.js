const VoterModel = require('../models/voter')

class VoterService {

  static async findByVotingId(unique_voting_id) {
    return VoterModel.findOne({unique_voting_id})
  }

  static async findById(id) {
    return VoterModel.findById(id)
  }

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return VoterModel.find({ $or: [
      {middle_name: pattern}, {surname: pattern}, {first_name: pattern}
    ] })
  }
  
  static async findAll() {
    return VoterModel.find()
  }

  static async create(dao) {
    return VoterModel.create(dao)
  }

  static async updateOne(update) {
    return VoterModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return VoterModel.findByIdAndRemove(id)
  }

}

module.exports = VoterService