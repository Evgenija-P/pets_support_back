const Joi = require('joi');
const {
    emailRegex, 
    dateRegexp, 
    userNameRegexp, 
    cityRegexp,
    phoneRegexp
} = require('../helpers/regExps')

const updateUserSchema = Joi.object({
    email: Joi.string().email().pattern(emailRegex).required(),
    name: Joi.string().pattern(userNameRegexp).required(),
    city: Joi.string().pattern(cityRegexp).required(),
    phone: Joi.string().pattern(phoneRegexp).required(),
    birthdate: Joi.string().pattern(dateRegexp).required(),
})

module.exports = updateUserSchema;
