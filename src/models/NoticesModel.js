const mongoose = require('mongoose');
const { handleMongooseError } = require('../helpers/handleMongooseError');

const categoryNameList = ['sell', 'lost-found', 'for-free'];
// const sexList = ['male', 'female'];
const noticesShema = new mongoose.Schema(
  {
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   require: true,
    // },
    title: {
      type: String,
      required: [true, 'Set title for notices'],
    },
    name: {
      type: String,
      required: [true, 'Set name for the pet'],
    },
    // birthdate: { type: Date, require: true },
    // breed: { type: String, required: true },
    // location: { type: String, required: true },
    // comments: { type: String, required: true },
    // sex: { type: String, enum: sexList, required: true },
    // price: { type: String, required: false, default: null },
    // petAvatarURL: { type: String, require: true },
    categoryName: {
      type: String,
      enum: categoryNameList,
      required: [true, 'Set categoryName for notices'],
    },

    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

noticesShema.post('save', handleMongooseError);
const Notices = mongoose.model('Notices', noticesShema);

module.exports = Notices;
