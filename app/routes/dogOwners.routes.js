const router = require('express').Router()
const dogOwnersController = require('../controllers/dogOwnersController')
const validateBody = require('../filters/validate.body')
const DogOwner = require('../models/dogOwner')

module.exports = router

router.post('/', validateBody(DogOwner) ,dogOwnersController.create)
router.get('/:id([0-9a-fA-F]{24})', dogOwnersController.readById)
router.delete('/:id([0-9a-fA-F]{24})', dogOwnersController.delete)
router.get('/', dogOwnersController.readAll)
router.put('/:id([0-9a-fA-F]{24})', validateBody(DogOwner) , dogOwnersController.update)