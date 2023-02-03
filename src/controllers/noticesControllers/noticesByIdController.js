const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { errorValidation } = require('../../helpers');

const noticesByIdController = async (req, res, next) => {
  //   const {
  //     user: { _id: owner },
  //   } = req;
  const id = req.params.noticesId;

  // const contact = await Notices.findById(id, owner).populate(
  //   'owner',
  //   'name email'
  // );
  // if (contact === null) {
  //   throw new WrongParametersError(`Contact with id:${id} not found`);
  //   // return res.status(404).json({ message: "Not found" });
  // }
  const notices = await Notices.findById(id);
  if (notices === null) {
    throw errorValidation(404, `Notices with id:${id} not found`);
  }
  res.json({ message: notices });
};
// module.exports = { noticesByIdController: ctrlWrapper(noticesByIdController) };
module.exports = noticesByIdController;
