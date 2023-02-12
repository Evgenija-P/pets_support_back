const Joi = require('joi');


const {
    emailRegex, 
    passwordRegexp
} = require('../helpers/regExps')

const signIn = Joi.object({
  email: Joi.string().email().pattern(emailRegex).required(),
  password: Joi.string().min(7).max(32).pattern(passwordRegexp).required(),
})

module.exports = signIn;