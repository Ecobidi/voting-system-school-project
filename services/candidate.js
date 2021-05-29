const CandidateModel = require('../models/candidate')

class CandidateService {

  static async findById(id) {
    return CandidateModel.findById(id).populate('election party').exec()
  }

  static async findByElection(election_id) {
    return CandidateModel.find({election: election_id}).populate('election party').exec()
  }

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return CandidateModel.find({ $or: [
      {first_name: pattern}, {surname: pattern}, {middle_name: pattern}
    ] }).populate('election party').exec()
  }
  
  static async findAll() {
    return CandidateModel.find().populate('election party').exec()
  }

  static async create(dao) {
    return CandidateModel.create(dao)
  }

  static async updateOne(update) {
    return CandidateModel.findByIdAndUpdate(update._id, {$set: update})
  }

  static async removeOne(id) {
    return CandidateModel.findByIdAndRemove(id)
  }

}

module.exports = CandidateService