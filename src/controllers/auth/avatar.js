const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;
const { User } = require('../../models');
const fs = require('fs').promises;


// Configuration
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
});

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

const avatar = async (req, res) => {
    const { path } = req.file;
    const { _id } = req.user;
    const result = await cloudinary.uploader.upload(path, options);
    
    await User.findByIdAndUpdate(_id, { avatarURL: result.url });
    
    await fs.unlink(path);


    res.json({
        status: "Success",
        code: 200,
        data: {
            avatarURL: result.url,
        }
    })
      
}

module.exports = avatar;