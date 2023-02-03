const multer = require('multer');
const path = require('path');


const upload = (req,res, next) => {
    console.log('upload middleware was invoked');
}

module.exports = upload;