module.exports = bodyIdRequired;

function bodyIdRequired(req, res, next) {
   if (!req.model._id) {
      const idError = "Error: _id property not found.";
      console.log(idError);
      res.status(400).send(idError);
      return;
   } else {
      next();
   }
}
