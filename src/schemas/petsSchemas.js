const Joi = require('joi');

const { dateRegexp } = require('../helpers/regExps');

const addPetSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().max(10).pattern(dateRegexp).required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120).allow(null, ''),
});

module.exports = {
  addPetSchema,
};
