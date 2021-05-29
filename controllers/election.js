const path = require('path')
const ElectionService = require('../services/election')
const BallotService = require('../services/ballot')
const CandidateService = require('../services/candidate')

class ElectionController {

  static async getElectionsPage(req, res) {
    let elections = await ElectionService.findAll()
    res.render('elections', {elections})
  }

  static async createElectionPage(req, res) {
    res.render('elections-new', { error_msg: req.flash('error_msg') })
  }

  static async createElection(req, res) {
    let dao = req.body
    let keys = Object.keys(dao)
    keys = keys.filter(k => {
      let pattern = /positions/ig
      return pattern.test(k)
    })
    dao.positions = keys.map(p => {
      let position = { 
        title: dao[p][0],
        description: dao[p][1],
       }
       delete dao[p]
      return position
    })

    dao.start_time = dao.start_date + "T" + dao.start_time

    dao.end_time = dao.end_date + "T" + dao.end_time

    try {
      if (req.files) {
        let file = req.files.photo
        let extname = path.extname(file.name)
        let filename = 'ballot_' + new Date().getTime() + extname
        await file.mv(process.cwd() + '/uploads/images/' + filename)
        dao.photo = filename
        await ElectionService.create(dao)
      } else {
        await ElectionService.create(dao)
      }
      res.redirect('/elections')
    } catch (err) {
      console.log(err)
      res.redirect('/elections')
    }
  }

  static async viewElectionResults(req, res) {
    let election_id = req.query.election_id
    try {
      let election = await ElectionService.findById(election_id)
      let castBallots = await BallotService.findBy({election: election_id})
      let candidates = await CandidateService.findByElection(election_id)
      candidates = candidates.map(({_id, surname, first_name, middle_name, party, photo, position}) => ({_id, surname, first_name, middle_name, party, photo, position}))

      let positions = election.positions.map(p => p.title)

      positions = positions.map(p => {
        let relatedBallots = castBallots.filter(cb => cb.position == p)
        let relatedCandidates = candidates.filter(bc => bc.position == p)

        relatedCandidates = relatedCandidates.map( rc => {
          let count = relatedBallots.filter(rb => rb.candidate.toString() == rc._id.toString())
          return {...rc, count: count.length}
        } )

        // console.log(relatedCandidates)
        return ({title: p, candidates: relatedCandidates, totalVotes: relatedBallots.length})
      })

      console.log(positions)
      
      res.render('ballots-results', {positions, election})
    } catch (error) {
      console.log(error)
      res.redirect('/elections')
    }
  }

  static async removeElection(req, res) {
    try {
      await ElectionService.removeOne(req.params.election_id)
      res.redirect('/elections')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/elections')
    }
  }

}

module.exports = ElectionController