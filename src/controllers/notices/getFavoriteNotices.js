const { Notices, Favorite } = require('../../models');
// const { HttpError } = require('../../helpers');

const PER_PAGE = 20;

const getFavoriteNotices = async (req, res, next) => {
  // console.log('getFavoriteNotices ');
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, limit = PER_PAGE, search = '' } = req.query;
  const skip = (page - 1) * limit;
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    // console.log('isHaveFavorite', isHaveFavorite);
    // throw HttpError(404, `user don't have favorite notices `);
    res.json({
      message: [],
      page: 0,
      totalHits: 0,
      favoriteList: [],
    });
  } else {
    const { favoriteList } = isHaveFavorite;
    if (favoriteList.length === 0) {
      // throw HttpError(404, `user don't have favorite notices `);
      res.json({
        message: [],
        page: 0,
        totalHits: 0,
        favoriteList: [],
      });
    } else {
      let favoriteNoticesList = [];
      let totalHits = 0;
      if (search) {
        const searchRegexp = new RegExp(search);
        // console.log('searchRegex', searchRegexp);
        favoriteNoticesList = await Notices.find(
          {
            $and: [
              { _id: { $in: [...favoriteList] } },
              {
                $or: [
                  { comments: { $regex: searchRegexp } },
                  { title: { $regex: searchRegexp } },
                ],
              },
            ],
          },
          '',
          {
            skip,
            limit,
          }
        );
        //  totalHits = await Notices.find({
        //    $or: [{ comments: { $regex: search } }, { title: { $regex: search } }],
        //  }).count();
        totalHits = await Notices.find({
          $and: [
            { _id: { $in: [...favoriteList] } },
            {
              $or: [
                { comments: { $regex: searchRegexp } },
                { title: { $regex: searchRegexp } },
              ],
            },
          ],
        }).count();
      } else {
        favoriteNoticesList = await Notices.find(
          {
            _id: { $in: [...favoriteList] },
          },
          '',
          {
            skip,
            limit,
          }
        );
        totalHits = await Notices.find({
          _id: { $in: [...favoriteList] },
        }).count();
      }
      res.json({
        message: favoriteNoticesList,
        favoriteList,
        page,
        totalHits,
        limit,
        search,
      });
    }
  }
};
module.exports = getFavoriteNotices;
