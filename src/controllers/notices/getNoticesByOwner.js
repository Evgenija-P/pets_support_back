const { Notices } = require('../../models');

const PER_PAGE = 20;
const getNoticesByOwner = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;
  const noticesList = await Notices.find({ owner }, '', {
    skip,
    limit,
  });

  const totalHits = await Notices.find({ owner }).count();

  res.json({ message: noticesList, page, totalHits });
};
module.exports = getNoticesByOwner;
