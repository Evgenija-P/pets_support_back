const { Schema, model } = require('mongoose');
const { Schema, model } = require('mongoose');

const TokenSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
