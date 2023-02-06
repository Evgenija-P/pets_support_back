// const Token = require('../models/token');

// const jwt = require('jsonwebtoken');
// const { nanoid } = require('nanoid');

// require('dotenv').config();

// const { SECRET_KEY } = process.env;

// const generateAccessToken = userId => {
//   const payload = {
//     userId: user._id,
//     type: 'access',
//   };
//   const options = { expiresIn: '30m' };

//   return jwt.sign(payload, SECRET_KEY, options);
// };

// const generateRefreshToken = () => {
//   const payload = {
//     id: nanoid(),
//     type: 'refresh',
//   };
//   const options = { expiresIn: '23h' };

//   return { id: payload.id, token: jwt.sign(payload, SECRET_KEY, options) };
// };

// const replaceDbRefreshToken = (userId, tokenId) => {
//   Token.findOneAndRemove({ userId })
//     .exec()
//     .then(() => {
//       Token.create({ tokenId, userId });
//     });
// };

// module.exports = {
//   generateAccessToken,
//   generateRefreshToken,
//   replaceDbRefreshToken,
// };
