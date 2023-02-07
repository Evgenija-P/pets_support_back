const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const sexList = ['male', 'female'];

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
      required: [true, 'Birthday is required'],
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, 'Breed is required'],
    },
    sex: { type: String, enum: sexList, required: true },
    photoURL: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
      minlength: 8,
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
