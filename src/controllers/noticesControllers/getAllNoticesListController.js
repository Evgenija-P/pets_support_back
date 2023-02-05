const { Notices } = require('../../models');

const PER_PAGE = 20;
const getAllNoticesListController = async (req, res, next) => {
  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;

  const noticesList = await Notices.find({}, '', {
    skip,
    limit,
  });

  res.json({ message: noticesList });
};
module.exports = getAllNoticesListController;
