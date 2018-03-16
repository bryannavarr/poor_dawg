module.exports = validate;
function validate(model) {
  return (req, res, next) => {
    const result = model.validate(req.body);
    if (result.error) {
      console.log("blah blah");
      console.log(result.error);
      res.status(400).json(result.error);
      return;
    }
    req.model = result.value;
    next();
  };
}
