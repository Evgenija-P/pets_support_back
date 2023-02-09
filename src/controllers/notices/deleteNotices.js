const { Notices } = require('../../models');
const { HttpError } = require('../../helpers');
// const { cloud } = require('../../services');
const deleteNotices = async (req, res, next) => {
  const idNotices = req.params.noticesId;
  // console.log('deleteNotices');
  const {
    user: { _id: owner },
  } = req;

  const noticesRemoved = await Notices.findOneAndRemove({
    owner,
    _id: idNotices,
  });
  if (noticesRemoved === null) {
    throw HttpError(404, `Notices with id:${idNotices} not found`);
  }
  // const imageId = cloud.parseIdFromImageURL(noticesRemoved.photoURL);

  // await cloud.removeImageFromCloud(imageId);

  res.json({ message: noticesRemoved });
};
module.exports = deleteNotices;
