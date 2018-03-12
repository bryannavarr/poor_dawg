const router = require('express').Router()
const interactionController = require('../controllers/interaction.controller')
const validateInteraction = require('../filters/validate.interaction')
const Interaction = require('../models/interaction')


module.exports = router


// api routes

router.get('/', interactionController.readAll)
router.get('/:id([0-9a-fA-F]{24})', interactionController.readById)
router.post('/', validateInteraction(Interaction), interactionController.create);
router.put('/:id([0-9a-fA-F]{24})', validateInteraction(Interaction), interactionController.update)
router.delete('/:id([0-9a-fA-F]{24})', interactionController.delete)