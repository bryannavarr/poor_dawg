const router = require('express').Router()
const interactionController = require('../controllers/interaction.controller')


module.exports = router


// api routes

router.post('/', interactionController.create)