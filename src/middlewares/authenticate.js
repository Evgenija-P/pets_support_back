const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log('authenticate middleware was invoked.');

}

module.exports = authenticate;