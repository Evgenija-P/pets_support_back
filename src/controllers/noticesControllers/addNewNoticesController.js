const { Notices } = require('../../models');
const addNewNoticesController = async (req, res, next) => {
  const { body, user } = req;
  const { _id: owner, email, phone } = user;
  const NewNotices = new Notices({ ...body, owner, email, phone });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

module.exports = addNewNoticesController;
