const Joi = require('joi').extend(require('@joi/date'));

const categoryNameList = ['sell', 'lost-found', 'for-free'];
const sexList = ['male', 'female'];
const { dateRegexp, cityRegexp, priceRegexp } = require('../helpers/regExps');
const addNoticesSchema = Joi.object({
  name: Joi.string().min(2).max(16).allow(null, ''),
  title: Joi.string().required(),
  breed: Joi.string().min(2).max(16).allow(null, ''),
  location: Joi.string().pattern(cityRegexp).required(),
  comments: Joi.string().min(8).max(120).allow(null, ''),
  price: Joi.string().pattern(priceRegexp).optional(),
  categoryName: Joi.string()
    .valid(...categoryNameList)
    .required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  birthdate: Joi.string().max(10).pattern(dateRegexp).allow(null, ''),
});

const schemas = {
  addNoticesSchema,
};

module.exports = schemas;
