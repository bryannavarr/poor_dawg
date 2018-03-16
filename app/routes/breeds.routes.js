const router = require("express").Router();
const breedsController = require("../controllers/breeds.controller");
const validateBody = require("../filters/validate.body");
const Breed = require("../models/breed");

module.exports = router;

router.get("/", breedsController.readAll);
router.get("/:id([0-9a-fA-F]{24})", breedsController.readById);
router.post("/", validateBody(Breed), breedsController.create);
router.put(
  "/:id([0-9a-fA-F]{24})",
  validateBody(Breed),
  breedsController.update
);
router.delete("/:id([0-9a-fA-F]{24})", breedsController.delete);
