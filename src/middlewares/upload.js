const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', '..', 'temp'),
  filename: (req, file, cb) => {
    const { _id: userId } = req.user;
    const [name, extention] = file.originalname.split('.');
    const fileName = `user_${userId}_${name}_${Date.now()}.${extention}`;

const multerConfig = multer.diskStorage({
    destination: path.join(__dirname, "../../", 'temp')
})

const upload = multer(
    {
        storage: multerConfig
    }
) 
    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
