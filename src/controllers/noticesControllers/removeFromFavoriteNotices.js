const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { HttpError } = require('../../helpers');

const removeFromFavoriteNotices = async (req, res, next) => {
  // const {
  //   body,
  //   //   user: { _id: owner },
  // } = req;
  const id = req.params.noticesId;
  // const contactUpdated = await updateStatusContact(id, { ...body, owner });

  const noticestUpdated = await Notices.findByIdAndUpdate(
    id,
    {
      $set: { favorite: false },
    },
    { new: true }
  );
  if (noticestUpdated === null) {
    throw HttpError(404, ` Notices with id:${id} not found`);
  }

  res.json({ message: noticestUpdated });
};
// module.exports = {
//   addToFavoriteNoticesController: ctrlWrapper(addToFavoriteNoticesController),
// };
module.exports = removeFromFavoriteNotices;
