const path = require('path')
const PartyService = require('../services/party')

class PartyController {

  static async getPartiesPage(req, res) {
    let parties = await PartyService.findAll()
    res.render('parties', {parties})
  }

  static async createPartyPage(req, res) {
    res.render('parties-new', { error_msg: req.flash('error_msg') })
  }

  static async createParty(req, res) {
    let dao = req.body
    try {
      if (req.files) {
        let file = req.files.photo
        let extname = path.extname(file.name)
        let filename = 'party_' + new Date().getMilliseconds() + extname
        await file.mv(process.cwd() + '/uploads/images/' + filename)
        dao.photo = filename
        await PartyService.create(dao)
      } else {
        await PartyService.create(dao)
      }
      res.redirect('/parties')
    } catch (err) {
      console.log(err)
      res.redirect('/parties')
    }
  }

  static async removeParty(req, res) {
    try {
      await PartyService.removeOne(req.params.party_id)
      res.redirect('/parties')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/parties')
    }
  }

}

module.exports = PartyController