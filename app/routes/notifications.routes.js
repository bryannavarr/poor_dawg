const router = require('express').Router()
const notificationsController = require('../controllers/notifications.controller')
const validateBody = require('../filters/validate.body')
const Notification = require('../models/notification')

module.exports = router

router.get('/', notificationsController.readAll)