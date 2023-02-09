const Joi = require('joi').extend(require('@joi/date'));

const categoryNameList = ['sell', 'lost-found', 'for-free'];
const sexList = ['male', 'female'];
const dateRegexp =
  /(^(0+?[1-9]|[12][0-9]|3[01])[-\.](0+?[1-9]|[1][0-12])[-\.]((19|20)\d\d))/;
const addNoticesSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  title: Joi.string().min(2).max(48).required(),
  breed: Joi.string().min(2).max(24).required(),
  // location: Joi.array().items(Joi.string().required(), Joi.string().required()),
  location: Joi.string().required(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().integer().min(1).optional(),
  // petImageURL: Joi.string().optional(),
  categoryName: Joi.string()
    .valid(...categoryNameList)
    .required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  // birthdate: Joi.date().format('DD-MM-YYYY').raw().required(),
  birthdate: Joi.string().pattern(dateRegexp).required(),
});

const schemas = {
  addNoticesSchema,
};

module.exports = schemas;
