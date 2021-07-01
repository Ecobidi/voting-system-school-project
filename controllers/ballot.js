const BallotService = require('../services/ballot')
const CandidateService = require('../services/candidate')
const ElectionService = require('../services/election')
const VoterService = require('../services/voter')

class BallotController {

  static async getOngoingElectionsPage(req, res) {
    let elections = await ElectionService.findActive()
    res.render('ballots-ongoing', {elections})
  }

  static async getVotingPage(req, res) {
    let election_id = req.query.election_id
    if (!election_id) {
      req.flash('error_msg', 'No Ongoing Election Selected')
      return res.redirect('/ballots/ongoing')
    }
    try {
      let election = await ElectionService.findById(election_id)
      if (!election) {
        req.flash('error_msg', 'No Matching Election Found')
        return res.redirect('/ballots/ongoing')
      }
      // check if voter has already cast their votes
      let numberOfBallots = await BallotService.countByVoterIdAndElectionId(req.session.voter._id, election_id)
      if (numberOfBallots > 0) {
        req.flash('error_msg', 'You have already cast your vote!')
        return res.redirect('/ballots/ongoing')
      }

      let candidates = await CandidateService.findByElection(election_id)
      console.log(election)
      res.render('ballots-new', {election, candidates})
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'An error occured')
      res.redirect('/ballots/ongoing')
    }
  }

  static async getBallotLoginPage(req, res) {
    if (req.session.voter) {
      return res.redirect('/ballots/ongoing')
    }
    res.render('ballots-login', {error_msg: req.flash('error_msg')})
  }

  static async handleBallotLogout(req, res) {
    req.session.voter = null
    res.redirect('/ballots/logout')
  }

  static async handleBallotLogin(req, res) {
    try {
      let voter = await VoterService.findByVotingId(req.body.unique_voting_id)
      if (!voter) {
        req.flash('error_msg', 'Invalid Voter Information!')
        return res.redirect('/ballots/login')
      }
      if (voter.password != req.body.password) {
        req.flash('error_msg', 'Invalid voter passphrase!')
        return res.redirect('/ballots/login')
      } 
      req.session.voter = voter
      res.redirect('/ballots/ongoing')
    } catch (error) {
      console.log(error)
      res.redirect('/ballots/login')
    }
  }

  // static async getBallotsPage(req, res) {
  //   let ballots = await BallotService.findAll()
  //   res.render('ballots-new', {ballots})
  // }

  // static async createBallotPage(req, res) {
  //   let elections = await ElectionService.findAll()
  //   let candidates = await CandidateService.findByElection(elections[0]._id)
  //   res.render('ballots-new', { error_msg: req.flash('error_msg'), election: elections[0], candidates })
  // }

  static async createBallot(req, res) {
    let dao = req.body
    let ballots = []
    let positions = Object.keys(dao)
    ballots = positions.map(p => {
      return {
        election: req.query.election_id,
        voter: req.session.voter._id,
        position: p,
        candidate: dao[p],
      }
    })  
    try {
      await BallotService.saveBallots(ballots)
      res.redirect('/ballots/ongoing')
    } catch (err) {
      console.log(err)
      res.redirect('/ballots/ongoing')
    }
  }

  // static async removeBallot(req, res) {
  //   try {
  //     await BallotService.removeOne(req.params.ballot_id)
  //     res.redirect('/ballots')
  //   } catch (err) {
  //     console.log(err)
  //     req.flash('error_msg', 'Last Operation Failed')
  //     res.redirect('/ballots')
  //   }
  // }

}

module.exports = BallotController