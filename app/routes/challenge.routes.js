const router = require('express').Router()
const challengeController = require('../controllers/challenge.controller')
const validateBody = require('../filters/validate.body')
const Challenge = require('../models/challenge')

module.exports = router

// api routes ===========================================================
router.get('/challenges', challengeController.readAll)
router.get('/challenges/:id([0-9a-fA-F]{24})', challengeController.readById)
router.post('/challenges', validateBody(Challenge), challengeController.create)
router.put('/challenges/:id([0-9a-fA-F]{24})', validateBody(Challenge),challengeController.update)
router.delete('/challenges/:id([0-9a-fA-F]{24})', challengeController.delete)