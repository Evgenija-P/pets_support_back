const mongoose = require('mongoose');
const { handleMongooseError } = require('../helpers');

const categoryNameList = ['sell', 'lost-found', 'for-free'];
const sexList = ['male', 'female'];
const phoneRegexp = /^\+380\d{2}\d{3}\d{2}\d{2}$/;
const emailRegexp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const dateRegexp =
  /(^(0+?[1-9]|[12][0-9]|3[01])[-\.](0+?[1-9]|[1][0-12])[-\.]((19|20)\d\d))/;
const noticesShema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegexp,
    },
    phone: {
      type: String,
      required: [true, 'Mobile Phone is required'],
      match: phoneRegexp,
    },
    title: {
      type: String,
      required: [true, 'Set title for notices'],
      unique: true,
      minlength: 2,
      maxlength: 48,
    },
    name: {
      type: String,
      required: [true, 'Set name for the pet'],
      minlength: 2,
      maxlength: 16,
    },
    birthdate: { type: String, require: true, match: dateRegexp },
    breed: { type: String, required: true },
    location: { type: String, required: true },
    comments: { type: String, required: true, minlength: 8, maxlength: 120 },
    sex: { type: String, enum: sexList, required: true },
    price: { type: String, required: false, default: null },
    petImageURL: {
      type: String,
      require: true,
      default: null,
    },
    categoryName: {
      type: String,
      enum: categoryNameList,
      required: [true, 'Set categoryName for notices'],
    },
  },
  { versionKey: false, timestamps: true }
);

noticesShema.post('save', handleMongooseError);
const Notices = mongoose.model('Notices', noticesShema);

module.exports = Notices;
