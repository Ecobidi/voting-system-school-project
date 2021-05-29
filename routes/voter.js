const router = require('express').Router()
// const { body } = require('express-validator')
const VoterController = require('../controllers/voter')

router.get('/', VoterController.getVotersPage)

router.get('/new', VoterController.createVoterPage)

router.post('/new', VoterController.createVoter)

router.get('/remove/:voter_id', VoterController.removeVoter)

module.exports = router