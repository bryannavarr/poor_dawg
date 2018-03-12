const router = require('express').Router()
const sponsorsController = require('../controllers/sponsors.controller')
const validateBody = require('../filters/validate.body')
const SponsorsSchema = require('../models/sponsorsSchema')

module.exports = router

router.post("/", validateBody(SponsorsSchema), sponsorsController.postNew)
router.get("/", sponsorsController.getAll)
router.get("/:id",sponsorsController.getById)