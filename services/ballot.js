const BallotModel = require('../models/ballot')

class BallotService {

  static async countByVoterIdAndElectionId(voter_id, election_id) {
    return BallotModel.find({voter: voter_id, election: election_id}).count()
  }

  static async countBy(query) {
    return BallotModel.find(query).count()
  }

  static async findBy(query) {
    return BallotModel.find(query).exec()
  }

  static async findById(id) {
    return BallotModel.findById(id)
  }
  
  static async findAll() {
    return BallotModel.find()
  }

  static async saveBallots(ballots_list) {
    return BallotModel.create(ballots_list)
  }

  static async create(dao) {
    return BallotModel.create(dao)
  }

  static async removeOne(id) {
    return BallotModel.findByIdAndRemove(id)
  }

}

module.exports = BallotService