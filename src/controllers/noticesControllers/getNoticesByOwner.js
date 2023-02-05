const { Notices } = require('../../models');
// const { HttpError } = require('../../helpers');

const PER_PAGE = 20;
const getNoticesByOwner = async (req, res, next) => {
  // const categoryName = req.params.categoryName;
  const {
    user: { _id: owner },
  } = req;
  //   const categoryName = req.params.categoryName;
  // const { categoryName = 'sell' } = req.query;
  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;

  //   if (!categoryName) {
  //     throw HttpError(400, `invalid categoryName`);
  //   }
  console.log('owner!!');

  const noticesList = await Notices.find({ owner }, '', {
    skip,
    limit,
  });

  res.json({ message: noticesList });
};
module.exports = getNoticesByOwner;
