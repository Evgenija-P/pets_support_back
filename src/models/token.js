// const { Schema, model } = require('mongoose');
// const { handleMongooseError } = require('../helpers');

// const tokenSchema = new Schema({
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   tokenId: {
//     type: String,
//     required: true,
//   },
// });

// const Token = model('token', tokenSchema);

// tokenSchema.post('save', handleMongooseError);

// module.exports = Token;
