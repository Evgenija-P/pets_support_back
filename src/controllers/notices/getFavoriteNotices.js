const { Favorite } = require('../../models');

const getFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, limit = 20, search = '' } = req.query;
  const skip = (page - 1) * limit;
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    res.json({
      message: [],
      page: 0,
      totalHits: 0,
      favoriteList: [],
    });
  } else {
    const { favoriteList } = isHaveFavorite;
    if (favoriteList.length === 0) {
      res.json({
        message: [],
        page: 0,
        totalHits: 0,
        favoriteList: [],
      });
    } else {
      await Favorite.find(
        {
          owner,
        },
        '',
        {
          skip,
          limit,
        }
      );
      const { favoriteList } = isHaveFavorite;

      res.json({
        message: favoriteList,
        favoriteList,
        page,
        totalHits: favoriteList.length,
        limit,
        search,
      });
    }
  }
};
module.exports = getFavoriteNotices;
