const { isValidObjectId } = require('mongoose');
const { HttpError, searchIdParamName } = require('../helpers');

const validateId = (req, res, next) => {
  const idParamName = searchIdParamName(Object.keys(req.params));
  const id = req.params[idParamName];

  if (!isValidObjectId(id)) {
    next(new HttpError(400, `${id} is not correct id format`));
  }
  next();
};

module.exports = validateId;
