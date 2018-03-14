const router = require('express').Router()
const notificationsController = require('../controllers/notifications.controller')
const validateBody = require('../filters/validate.body')
const Notification = require('../models/notification')
const bodyIdRequired = require('../filters/id.filter')

module.exports = router

router.get('/', notificationsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', notificationsController.readById)
router.post('/', validateBody(Notification), notificationsController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(Notification), bodyIdRequired(Notification), notificationsController.update)
router.delete('/:id([0-9a-fA-F]{24})', notificationsController.delete)
