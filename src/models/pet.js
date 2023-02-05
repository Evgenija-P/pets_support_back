const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

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

const petJoiSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.string().required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120).allow(null, ''),
});

const Pet = model('pet', petSchema);

module.exports = {
  Pet,
  petJoiSchema,
};
