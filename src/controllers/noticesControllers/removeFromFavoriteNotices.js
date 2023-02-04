const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { errorValidation } = require('../../helpers');

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
    throw errorValidation(404, ` Notices with id:${id} not found`);
  }

  res.json({ message: noticestUpdated });
};
// module.exports = {
//   addToFavoriteNoticesController: ctrlWrapper(addToFavoriteNoticesController),
// };
module.exports = removeFromFavoriteNotices;
