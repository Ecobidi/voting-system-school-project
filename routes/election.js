const router = require('express').Router()
const ElectionController = require('../controllers/election')

router.get('/', ElectionController.getElectionsPage)

router.get('/new', ElectionController.createElectionPage)

router.post('/new', ElectionController.createElection)

router.get('/results', ElectionController.viewElectionResults)

router.get('/remove/:election_id', ElectionController.removeElection)

module.exports = router