const { Notices } = require('../../models');
const { HttpError } = require('../../helpers');

const getNoticesByCategory = async (req, res, next) => {
  const { categoryName } = req.params;
  const { search = '' } = req.query;

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  if (!categoryName) {
    throw HttpError(400, `invalid categoryName`);
  }
  let noticesList = [];
  let totalHits = 0;
  if (search) {
    const searchRegexp = new RegExp(search);
    noticesList = await Notices.find(
      {
        $and: [
          { categoryName },
          {
            $or: [
              { comments: { $regex: searchRegexp, $options: 'i' } },
              { title: { $regex: searchRegexp, $options: 'i' } },
            ],
          },
        ],
      },
      '',
      {
        skip,
        limit,
      }
    ).sort({ createdAt: -1 });

    totalHits = await Notices.find({
      $and: [
        { categoryName },
        {
          $or: [
            { comments: { $regex: searchRegexp, $options: 'i' } },
            { title: { $regex: searchRegexp, $options: 'i' } },
          ],
        },
      ],
    }).count();
  } else {
    noticesList = await Notices.find({ categoryName }, '', {
      skip,
      limit,
    }).sort({ createdAt: -1 });
    totalHits = await Notices.find({ categoryName }).count();
  }

  res.json({
    message: noticesList,
    search,
    page,
    totalHits,
    limit,
  });
};
module.exports = getNoticesByCategory;
