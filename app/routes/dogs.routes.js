const router = require('express').Router()
const dogsController = require('../controllers/dogs.controller')
const validateBody = require('../filters/validate.body')
const Hacker = require('../models/hacker')
const Dogs = require('../models/dogs')

module.exports = router

router.get('/', dogsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', dogsController.readById)
router.post('/', validateBody(Dogs), dogsController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(Dogs), dogsController.update)
router.delete('/:id([0-9a-fA-F]{24})', dogsController.delete)