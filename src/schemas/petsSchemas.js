const Joi = require('joi');

const sexList = ['male', 'female'];

const dateRegexp =
  /(^(0+?[1-9]|[12][0-9]|3[01])[-\.](0+?[1-9]|[1][0-12])[-\.]((19|20)\d\d))/;

const addPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().pattern(dateRegexp).required(),
  breed: Joi.string().min(2).max(16).required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  comments: Joi.string().min(8).max(120).allow(null, ''),
});

module.exports = {
  addPetSchema,
};
