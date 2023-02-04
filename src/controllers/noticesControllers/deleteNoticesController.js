const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { errorValidation } = require('../../helpers');

const deleteNoticesController = async (req, res, next) => {
  const id = req.params.noticesId;
  //   const {
  //     user: { _id: owner },
  //   } = req;
  const noticesRemovedById = await Notices.findByIdAndRemove(id);
  //   const contactRemovedById = await Contact.findByIdAndRemove(id, owner);
  if (noticesRemovedById === null) {
    throw errorValidation(404, `Notices with id:${id} not found`);
  }
  res.json({ message: `notices ${noticesRemovedById.name} deleted` });
};
// module.exports = {
//   deleteNoticesController: ctrlWrapper(deleteNoticesController),
// };
module.exports = deleteNoticesController;
