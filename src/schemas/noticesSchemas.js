const Joi = require('Joi').extend(require('@joi/date'));

const categoryNameList = ['sell', 'lost-found', 'for-free'];
const sexList = ['male', 'female'];
const addNoticesSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  title: Joi.string().min(2).max(48).required(),
  breed: Joi.string().min(2).max(24).required(),
  // location: Joi.array().items(Joi.string().required(), Joi.string().required()),
  location: Joi.string().required(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().integer().min(1).optional(),
  petImageURL: Joi.string().optional(),
  categoryName: Joi.string()
    .valid(...categoryNameList)
    .required(),
  sex: Joi.string()
    .valid(...sexList)
    .required(),
  birthdate: Joi.date().format('DD-MM-YYYY').raw().required(),
});

const getNoticesByCategorySchema = Joi.object({
  categoryName: Joi.string()
    .valid(...categoryNameList)
    .required(),
});
const schemaFavoritePatch = Joi.object({
  favorite: Joi.bool().required(),
});

// const avatarUpdateSchema = Joi.object({
//   subscription: Joi.string()
//     .valid(...subscriptionList)
//     .required(),
// });

const schemas = {
  getNoticesByCategorySchema,
  addNoticesSchema,
  schemaFavoritePatch,
};

module.exports = schemas;
