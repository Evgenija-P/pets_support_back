const { User } = require('../../models');
const fs = require('fs').promises;
const {cloud} = require('../../services')


    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

const avatar = async (req, res) => {
    const { path } = req.file;
    const { _id } = req.user;
    const result = await cloud.uploadImage(path, options);
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