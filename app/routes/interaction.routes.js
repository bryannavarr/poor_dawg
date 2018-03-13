const router = require("express").Router();
const interactionController = require("../controllers/interaction.controller");
const validateBody = require("../filters/validate.body");
const Interaction = require("../models/interaction");

module.exports = router;

// api routes

router.get("/", interactionController.readAll);
router.get("/:id([0-9a-fA-F]{24})", interactionController.readById);
router.post("/", validateBody(Interaction), interactionController.create);
router.put(
  "/:id([0-9a-fA-F]{24})",
  validateBody(Interaction),
  interactionController.update
);
router.delete("/:id([0-9a-fA-F]{24})", interactionController.delete);
