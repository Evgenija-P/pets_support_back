const mongoose = require('mongoose');
const { handleMongooseError } = require('../helpers');

const favoriteShema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },

    favoriteList: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  { versionKey: false, timestamps: true }
);

favoriteShema.post('save', handleMongooseError);
const Notices = mongoose.model('Favorite', favoriteShema);

module.exports = Notices;
