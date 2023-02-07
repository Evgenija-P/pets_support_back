const multer = require('multer');
const path = require('path');
const { HttpError } = require('../helpers');

const FILE_MAX_SIZE = 8388608;
const ACCEPTABLE_EXTENSIONS = ['jpg', 'jpeg', 'png'];

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'temp'),

  filename: (req, file, cb) => {
    const [, extension] = file.mimetype.split('/');
    if (!ACCEPTABLE_EXTENSIONS.includes(extension)) {
      cb(HttpError(400, `Invalid file extension.`));
      return;
    }

    const { _id: userId } = req.user;
    const [name, extention] = file.originalname.split('.');
    const fileName = `user_${userId}_${name}_${Date.now()}.${extention}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: FILE_MAX_SIZE },
});

module.exports = upload;
