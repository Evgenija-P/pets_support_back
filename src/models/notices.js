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
    location: { type: String, required: true, match: cityRegexp },
    comments: { type: String, required: true, minlength: 8, maxlength: 120 },
    sex: { type: String, enum: sexList, required: true },
    price: { type: String, required: false, default: null, match: priceRegexp },
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
