const router = require('express').Router()
const validateBody = require('../filters/validate.body')
const Reward = require('../models/reward')
const rewardsController = require('../controllers/rewards.controller')
const bodyIdRequired = require('../filters/id.filter')
const updatedDateTimestamp = require("../filters/timestamp");

module.exports = router

router.post('/', validateBody(Reward), rewardsController.create)
router.get('/', rewardsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', rewardsController.readById)
router.put(
    "/:id([0-9a-fA-F]{24})",
    validateBody(Reward),
    bodyIdRequired,
    updatedDateTimestamp,
    rewardsController.update
  );
router.delete('/:id([0-9a-fA-F]{24})', rewardsController.delete)
