const AlreadyVotedModel = require('../models/already_voted')

class AlreadyVotedService {

  static async findOne(unique_voting_id) {
    return AlreadyVotedModel.findOne({unique_voting_id})
  }

  static async findById(id) {
    return AlreadyVotedModel.findById(id)
  }
  
  static async findAll() {
    return AlreadyVotedModel.find()
  }

  static async create(dao) {
    return AlreadyVotedModel.create(dao)
  }

  static async removeOne(id) {
    return AlreadyVotedModel.findByIdAndRemove(id)
  }

}

module.exports = AlreadyVotedService