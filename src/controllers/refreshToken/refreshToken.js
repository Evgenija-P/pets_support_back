const { errorValidation } = require('../../helpers');

const refreshToken = async (req, res) => {
  res.json({
    status: 'Success',
    code: 200,
    message: 'Token refresh successful',
  });
};

module.exports = refreshToken;
