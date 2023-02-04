const jwt = require('jsonwebtoken');

const { HttpError } = require('../helpers')
const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
    console.log('authenticate middleware was invoked.');
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== "Bearer" || !token) {
        next(HttpError(401))
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await User.findById(id);
        if (!user || token !== String(user.token)) {
            next(HttpError(401))
        }

        req.user = user;
        next()

    } catch (error) {
        next(HttpError(401))
    }
}

module.exports = authenticate;