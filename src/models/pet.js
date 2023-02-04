const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: Date,
      required: [true, 'Birthday is required'],
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
    },
    photoURL: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
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
  name: Joi.string().min(2).required(),
  birthday: Joi.date().required(),
  breed: Joi.string().min(2).required(),
  comments: Joi.string().allow(null, ''),
});

const Pet = model('pet', petSchema);

module.exports = {
  Pet,
  petJoiSchema,
};
