const Joi = require('joi');

const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(32).required(),
})

module.exports = signIn;