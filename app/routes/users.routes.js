const router = require('express').Router()
const usersController = require('../controllers/users.controller')
const validateBody = require('../filters/validate.body')
const User = require('../models/users')

module.exports = router

router.get('/', usersController.readAll)
router.get('/:id([0-9a-fA-F]{24})', usersController.readById)
router.post('/', validateBody(User), usersController.create)
router.put('/id:([0-9a-fA-F]{24})', validateBody(User), usersController.update)
router.delete('/:id([0-9a-fA-F]{24})', usersController.delete)