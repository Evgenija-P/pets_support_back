// const { errorValidation } = require('../../helpers');

// const refreshToken = async (req, res) => {
//   res.json({
//     status: 'Success',
//     code: 200,
//     message: 'Token refresh successful',
//   });
// };

// module.exports = refreshToken;

// const Token = require('../../models/token');

// // in controllers login

// const tokenHelper = require('../../helpers/tokenHelper');

// const updateTokens = userId => {
//   const accessToken = tokenHelper.generateAccessToken(userId);
//   const refreshToken = tokenHelper.generateRefreshToken();

//   return tokenHelper
//     .replaceDbRefreshToken(refreshToken.id, userId)
//     .then(() => ({
//       accessToken,
//       refreshToken: refreshToken.token,
//     }));
// };

// // in function signIn

// if (isValid) {
//   updateTokens(user._id).then(tokens => res.json(tokens));
// } else {
//   res.status(401).json({ message: 'Invalid credentials' });
// }

// // function refreshToken

// refreshTokens = (req, res) => {
//   const { refreshToken } = req.body;
//   let payload;
//   try {
//     payload = jwt.verify(refreshToken, secret);
//     if (payload.type !== 'refresh') {
//       res.status(400).json({ message: 'Invalid token' });
//       return;
//     }
//   } catch (e) {
//     if (e instanceof jwt.TokenExpiredError) {
//       res.status(400).json({ message: 'Invalid expired' });
//       return;
//     } else if (e instanceof jwt.JsonWebTokenError) {
//       res.status(400).json({ message: 'Invalid token' });
//       return;
//     }
//   }

//   Token.findOne({ tokenId: payload.id })
//     .exen()
//     .then(token => {
//       if (token === null) {
//         throw new Error('Invalid token');
//       }
//       return updateTokens(token.userId);
//     })
//     .then(tokens => res.json(tokens))
//     .catch(err => res.status(400).json({ message: err.message }));
// };

// module.exports = {
//   signIn,
//   refreshTokens,
// };
