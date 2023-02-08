const { Notices } = require('../../models');
const { HttpError } = require('../../helpers');

const PER_PAGE = 20;
const getNoticesByCategory = async (req, res, next) => {
  const categoryName = req.params.categoryName;

  // const { categoryName = 'sell' } = req.query;
  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;

  if (!categoryName) {
    throw HttpError(400, `invalid categoryName`);
  }

  const noticesList = await Notices.find({ categoryName }, '', {
    skip,
    limit,
  });
  const totalHits = await Notices.find({ categoryName }).count();

  res.json({
    message: noticesList,
    page,
    totalHits,
  });
};
module.exports = getNoticesByCategory;
