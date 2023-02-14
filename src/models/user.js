const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  phone: {
    type: String,
    required: [true, 'Mobile Phone is required'],
  },
  token: {
    type: String,
    default: null,
  },
  birthday: {
    type: String,
    default: '',
  },
  avatarURL: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: true,
  },
  verificationToken: {
    type: String,
    default: null,
  },
});

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
