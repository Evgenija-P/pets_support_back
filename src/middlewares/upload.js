const multer = require('multer');
const path = require('path');


const multerConfig = multer.diskStorage({
    destination: path.join(__dirname, "../../", 'temp')
})

const upload = multer(
    {
        storage: multerConfig
    }
) 

module.exports = upload;