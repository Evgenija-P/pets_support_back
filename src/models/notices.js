const mongoose = require('mongoose');
const { handleMongooseError } = require('../helpers');

const categoryNameList = ['sell', 'lost-found', 'for-free'];
const sexList = ['male', 'female'];
const {
  phoneRegexp,
  emailRegex,
  dateRegexp,
  cityRegexp,
  priceRegexp,
} = require('../helpers/regExps');

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
      match: emailRegex,
    },
    phone: {
      type: String,
      required: [true, 'Mobile Phone is required'],
      match: phoneRegexp,
    },
    title: {
      type: String,
      required: [true, 'Set title for notices'],
    },
    name: {
      type: String,
      required: false,
      maxlength: 16,
      default: null,
    },
    birthdate: {
      type: String,
      require: false,
      maxlength: 10,
      match: dateRegexp,
      default: null,
    },
    breed: { type: String, required: false, default: null },
    location: { type: String, required: true, match: cityRegexp },
    comments: {
      type: String,
      required: false,
      maxlength: 120,
      default: null,
    },
    sex: { type: String, enum: sexList, required: true },
    price: { type: String, required: false, default: null, match: priceRegexp },
    petImageURL: {
      type: String,
      false: true,
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
