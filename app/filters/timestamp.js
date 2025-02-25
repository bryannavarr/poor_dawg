module.exports = updateDateTimestamp;
function updateDateTimestamp(req, res, next) {
  if (req.method === "PUT") {
    req.model.updateDate = new Date();
    delete req.model.createDate;
    next();
  } else {
    res.status(500).send("Timestamp does not support this method");
  }
}
