const { Notices } = require('../../models');
const { HttpError } = require('../../helpers');

const getNoticesById = async (req, res, next) => {
  //   const {
  //     user: { _id: owner },
  //   } = req;
  const id = req.params.noticesId;
  // const categoryName = req.params.categoryName;
  console.log('id', id);
  // const contact = await Notices.findById(id, owner).populate(
  //   'owner',
  //   'name email'
  // );
  const notices = await Notices.findById(id);
  if (notices === null) {
    throw HttpError(404, `Notices with id:${id} not found`);
  }
  res.json({ message: notices });
};
module.exports = getNoticesById;
