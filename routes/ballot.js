const router = require('express').Router()
const BallotController = require('../controllers/ballot')
const ElectionController = require('../controllers/election')

router.get('/login', BallotController.getBallotLoginPage)

router.post('/login', BallotController.handleBallotLogin)

router.use('/', async (req, res, next) => {
  if (!req.session.voter) {
    res.redirect('/ballots/login')
  } else {
    next()
  }
})

router.get('/ongoing', BallotController.getOngoingElectionsPage)

router.get('/election', BallotController.getVotingPage)

router.get('/logout', BallotController.handleBallotLogout)

// router.get('/new', BallotController.createBallotPage)

router.post('/new', BallotController.createBallot)

router.get('/results', ElectionController.viewElectionResults)

// router.get('/remove/:ballot_id', BallotController.removeBallot)

module.exports = router