const ElectionModel = require('../models/election')

class ElectionService {

  static async findActive() {
    return ElectionModel.find({status: 'active'})
  }

  static async findById(id) {
    return ElectionModel.findById(id)
  }

  static async findByDate(dateStr) {
    return ElectionModel.find({election_date: dateStr})
  }
  
  static async findAll() {
    return ElectionModel.find()
  }

  static async create(dao) {
    return ElectionModel.create(dao)
  }

  static async removeOne(id) {
    return ElectionModel.findByIdAndRemove(id)
  }

}

module.exports = ElectionService