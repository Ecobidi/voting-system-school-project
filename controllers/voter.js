const path = require('path')
const VoterService = require('../services/voter')

class VoterController {

  static async getVotersPage(req, res) {
    let voters = await VoterService.findAll()
    res.render('voters', {voters})
  }

  static async createVoterPage(req, res) {
    res.render('voters-new', { error_msg: req.flash('error_msg') })
  }

  static async createVoter(req, res) {
    let dao = req.body
    if (dao.password != dao.retype_password) {
      req.flash('error_msg', 'Passwords do not match')
      return res.redirect('/voters/new')
    }
    try {
      // if (req.files) {
      //   let file = req.files.photo
      //   let extname = path.extname(file.name)
      //   let filename = 'voter_' + new Date().getMilliseconds() + extname
      //   await file.mv(process.cwd() + '/uploads/images/' + filename)
      //   dao.photo = filename
      //   await VoterService.create(dao)
      // } else {
      //   await VoterService.create(dao)
      // }
      await VoterService.create(dao)
      res.redirect('/voters')
    } catch (err) {
      console.log(err)
      res.redirect('/voters')
    }
  }

  static async removeVoter(req, res) {
    try {
      await VoterService.removeOne(req.params.voter_id)
      res.redirect('/voters')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/voters')
    }
  }

}

module.exports = VoterController