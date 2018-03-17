const router = require('express').Router()
const vetsController = require('../controllers/vets.controller')
const validateBody = require('../filters/validate.body')
const Vet = require('../models/vet')

module.exports = router

// api routes ===========================================================
router.get('/', vetsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', vetsController.readById)
router.post('/', validateBody(Vet), vetsController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(Vet), vetsController.update)
router.delete('/:id([0-9a-fA-F]{24})', vetsController.delete)
