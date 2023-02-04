const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const sponsorsSchema = Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  url: {
    type: String,
  },
  addressUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: 'true',
  },
  address: {
    type: String,
    default: null,
  },
  workDays: {
    isOpen: { type: Boolean, default: false },
    from: String,
    to: String,
  },
  phone: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
});

sponsorsSchema.post('save', handleMongooseError);
const Sponsors = model('sponsors', sponsorsSchema);

module.exports = Sponsors;
