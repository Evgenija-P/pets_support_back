const Joi = require('joi');

const {
    emailRegex, 
    passwordRegexp,
    userNameRegexp,
    cityRegexp,
    phoneRegexp
} = require('../helpers/regExps')


const signUp = Joi.object({
    email: Joi.string().email().pattern(emailRegex).required(),
    password: Joi.string().min(7).max(32).pattern(passwordRegexp).required(),
    name: Joi.string().pattern(userNameRegexp).required(),
    city: Joi.string().pattern(cityRegexp).required(),
    phone: Joi.string().pattern(phoneRegexp).required(),
})

module.exports = signUp;

