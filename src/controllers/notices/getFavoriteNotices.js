const { Notices, Favorite } = require('../../models');
// const { HttpError } = require('../../helpers');

const PER_PAGE = 20;

const getFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, limit = PER_PAGE } = req.query;
  const skip = (page - 1) * limit;
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    // throw HttpError(404, `user don't have favorite notices `);
    res.json({
      message: [],
      page: 0,
      totalHits: 0,
    });
  }
  const { favoriteList } = isHaveFavorite;

  if (favoriteList.length === 0) {
    // throw HttpError(404, `user don't have favorite notices `);
    res.json({
      message: [],
      page: 0,
      totalHits: 0,
    });
  }

  const favoriteNoticesList = await Notices.find(
    {
      _id: { $in: [...favoriteList] },
    },
    '',
    {
      skip,
      limit,
    }
  );
  const totalHits = await Notices.find({
    _id: { $in: [...favoriteList] },
  }).count();

  res.json({
    message: favoriteNoticesList,
    page,
    totalHits,
  });
};
module.exports = getFavoriteNotices;
