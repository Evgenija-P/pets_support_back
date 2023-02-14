const { Favorite } = require('../../models');

const getFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, search = '' } = req.query;

  let nocitesRes = [];
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    res.json({
      message: nocitesRes,
      page: 0,
      totalHits: 0,
      favoriteList: nocitesRes,
    });
  } else {
    const { favoriteList } = isHaveFavorite;
    if (favoriteList.length === 0) {
      res.json({
        message: nocitesRes,
        page: 0,
        totalHits: 0,
        favoriteList: nocitesRes,
      });
    } else {
      if (search) {
        const { favoriteList } = isHaveFavorite;
        const filterFavoritrNotices = (notices, search) => {
          const filteredNocites = notices.filter(
            notice =>
              notice.title.toLowerCase().includes(search.toLowerCase()) ||
              notice.comments.toLowerCase().includes(search.toLowerCase())
          );
          return filteredNocites;
        };
        nocitesRes = filterFavoritrNotices(favoriteList, search);

        res.json({
          message: nocitesRes,
          favoriteList,
          page,
          totalHits: nocitesRes.length,
          search,
        });
      } else {
        const { favoriteList } = isHaveFavorite;

        res.json({
          message: favoriteList,
          favoriteList,
          page,
          totalHits: favoriteList.length,
          search,
        });
      }
    }
  }
};
module.exports = getFavoriteNotices;
