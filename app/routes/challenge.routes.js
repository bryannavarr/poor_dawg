const router = require('express').Router()
const challengeController = require('../controllers/challenge.controller')
const validateBody = require('../filters/validate.body')
const Challenge = require('../models/challenge')

module.exports = router

// api routes ===========================================================
router.get('/', challengeController.readAll)
router.get('/:id([0-9a-fA-F]{24})', challengeController.readById)
router.post('/', validateBody(Challenge), challengeController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(Challenge),challengeController.update)
router.delete('/:id([0-9a-fA-F]{24})', challengeController.delete)