const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const newsSchema = Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  url: {
    type: String,
    required: 'true',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  date: {
    type: String,
  },
});

newsSchema.post('save', handleMongooseError);
const News = model('news', newsSchema);

module.exports = News;
