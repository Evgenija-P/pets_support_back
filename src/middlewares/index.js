const validation = require('./validation');
const validateId = require('./validateId');
const authenticate = require('./authenticate.js');
const upload = require('./upload');
const ctrlWrapper = require('./ctrlWrapper');
module.exports = { validation, validateId, authenticate, upload, ctrlWrapper };
