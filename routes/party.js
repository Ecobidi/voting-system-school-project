const router = require('express').Router()
const PartyController = require('../controllers/party')

router.get('/', PartyController.getPartiesPage)

router.get('/new', PartyController.createPartyPage)

router.post('/new', PartyController.createParty)

router.get('/remove/:party_id', PartyController.removeParty)

module.exports = router