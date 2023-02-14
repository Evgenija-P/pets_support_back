const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const { dateRegexp } = require('../helpers/regExps');

const petSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: String,
      maxlength: 10,
      match: [dateRegexp, "birthdate must be a 'DD.MM.YYYY' format."],
      required: [true, 'Birthday is required'],
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, 'Breed is required'],
    },
    photoURL: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
      // minlength: 8,
      maxlength: 120,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post('save', handleMongooseError);

const Pet = model('pet', petSchema);

module.exports = {
  Pet,
};
