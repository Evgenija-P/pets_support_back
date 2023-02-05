const { Notices } = require('../../models');
const addNewNoticesController = async (req, res, next) => {
  const { body, user } = req;
  const { _id: owner, email, phone } = user;

  // let petImageURL = '';
  // const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

  // if (req.file) {
  //   const { path: tempUpload, filename } = req.file;
  //   Jimp.read(tempUpload)
  //     .then(avatar => {
  //       const resultUpload = path.join(avatarDir, filename);
  //       return avatar
  //         .resize(250, 250) // resize
  //         .quality(60) // set JPEG quality
  //         .write(resultUpload); // save
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });

  //   // const resultUpload = path.join(avatarDir, filename);
  //   try {
  //     await fs.unlink(tempUpload);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   petImageURL = path.join('avatars', filename);
  //   // console.log("avatarURL", avatarURL);
  // } else {
  //   petImageURL = gravatar.url(email, { protocol: 'http', s: '250' });
  //   // console.log("avatarURL", avatarURL);
  // }
  const NewNotices = new Notices({ ...body, owner, email, phone });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

module.exports = addNewNoticesController;
