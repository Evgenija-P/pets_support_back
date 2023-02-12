const Joi = require('joi').extend(require('@joi/date'));

const categoryNameList = ['sell', 'lost-found', 'for-free'];
const sexList = ['male', 'female'];
const { dateRegexp, cityRegexp, priceRegexp } = require('../helpers/regExps');
const addNoticesSchema = Joi.object({
  name: Joi.string().min(2).max(16).optional(),
  title: Joi.string().min(2).max(48).required(),
  breed: Joi.string().min(2).max(24).optional(),
  // location: Joi.array().items(Joi.string().required(), Joi.string().required()),
  location: Joi.string().pattern(cityRegexp).required(),
  comments: Joi.string().min(8).max(120).optional(),
  price: Joi.string().pattern(priceRegexp).optional(),
  // petImageURL: Joi.string().optional(),
  categoryName: Joi.string()
    .valid(...categoryNameList)
    .required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  // birthdate: Joi.date().format('DD-MM-YYYY').raw().required(),
  birthdate: Joi.string().pattern(dateRegexp).optional(),
});

const schemas = {
  addNoticesSchema,
};

module.exports = schemas;
