const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { HttpError } = require('../../helpers');

const addToFavoriteNoticesController = async (req, res, next) => {
  const {
    body,
    //   user: { _id: owner },
  } = req;
  const id = req.params.noticesId;
  // const contactUpdated = await updateStatusContact(id, { ...body, owner });
  if (body === {} || body === null) {
    throw HttpError(400, `missing field favorite`);
  }
  const { favorite } = body;

  const noticestUpdated = await Notices.findByIdAndUpdate(
    id,
    {
      $set: { favorite },
    },
    { new: true }
  );
  if (noticestUpdated === null) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }

  res.json({ message: noticestUpdated });
};
// module.exports = {
//   addToFavoriteNoticesController: ctrlWrapper(addToFavoriteNoticesController),
// };
module.exports = addToFavoriteNoticesController;
