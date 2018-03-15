const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = {
  _id: Joi.objectId(),
  companyName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  zipCode: Joi.string(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string().required(),
  createDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of creation"),
  updateDate: Joi.date()
    .iso()
    .default(() => new Date(), "time of updation")
};

module.exports = Joi.object().keys(schema);
