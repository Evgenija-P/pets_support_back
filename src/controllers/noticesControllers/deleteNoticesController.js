const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { HttpError } = require('../../helpers');

const deleteNoticesController = async (req, res, next) => {
  const id = req.params.noticesId;
  // const categoryName = req.params.categoryName;
  // console.log('noticesId', id);
  // console.log('categoryName', categoryName);

  const {
    user: { _id: owner },
  } = req;
  const notices = await Notices.findById(id);
  if (notices === null) {
    throw HttpError(404, `Notices with id:${id} not found`);
  }
  const { owner: noticesOwner } = notices;
  if (JSON.stringify(noticesOwner) !== JSON.stringify(owner)) {
    throw HttpError(403, `no permission to delete this post`);
  }
  const noticesRemovedById = await Notices.findByIdAndRemove(id);
  res.json({ message: `notices ${noticesRemovedById.name} deleted` });
};
module.exports = deleteNoticesController;
