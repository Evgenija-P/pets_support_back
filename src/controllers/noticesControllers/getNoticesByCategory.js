const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
const { errorValidation } = require('../../helpers');

const getNoticesByCategory = async (req, res, next) => {
  const categoryName = req.params.categoryName;
  //   const categoryName = req.params.categoryName;
  // const { categoryName = 'sell' } = req.query;
  if (!categoryName) {
    throw errorValidation(400, `invalid categoryName`);
  }
  console.log('categoryName', categoryName);
  const noticesList = await Notices.find({ categoryName: categoryName });
  res.json({ message: noticesList });
  // };
  // module.exports = { getNoticesByCategory: ctrlWrapper(getNoticesByCategory) };
};
module.exports = getNoticesByCategory;
