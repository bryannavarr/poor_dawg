const router = require('express').Router()
const sponsorsController = require('../controllers/sponsors.controller')
const validateBody = require('../filters/validate.body')
const SponsorsSchema = require('../models/sponsorsSchema')

module.exports = router

router.post("/", validateBody(SponsorsSchema), sponsorsController.getByEmail)
router.get("/", sponsorsController.readAll)
router.get("/:id", sponsorsController.getById)
router.put("/:id", validateBody(SponsorsSchema), sponsorsController.update)
router.delete("/:id", sponsorsController.del)