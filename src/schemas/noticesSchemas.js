const Joi = require('Joi');

const categoryNameList = ['sell', 'lost-found', 'for-free'];
// const sexList = ['male', 'female'];
const addNoticesSchema = Joi.object({
  name: Joi.string().required(),
  title: Joi.string().required(),
  categoryName: Joi.string()
    .valid(...categoryNameList)
    .required(),
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
