const PartyModel = require('../models/party')

class PartyService {

  static async findById(id) {
    return PartyModel.findById(id)
  }

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return PartyModel.find({name: pattern})
  }
  
  static async findAll() {
    return PartyModel.find()
  }

  static async create(dao) {
    return PartyModel.create(dao)
  }

  static async removeOne(id) {
    return PartyModel.findByIdAndRemove(id)
  }

}

module.exports = PartyService