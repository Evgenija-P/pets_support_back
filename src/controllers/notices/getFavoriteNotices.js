const { Favorite } = require('../../models');

const getFavoriteNotices = async (req, res, next) => {
  const {
    user: { _id: owner },
  } = req;
  const { page = 1, search = '', limit } = req.query;
  const skip = (page - 1) * limit;
  let nocitesRes = [];
  const isHaveFavorite = await Favorite.findOne({ owner });
  if (isHaveFavorite === null) {
    res.json({
      message: nocitesRes,
      page: 0,
      totalHits: 0,
      favoriteList: nocitesRes,
      limit,
    });
  } else {
    const { favoriteList: onsortedfavoriteList } = isHaveFavorite;
    const favoriteList = [...onsortedfavoriteList].sort(function (a, b) {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });

    if (favoriteList.length === 0) {
      res.json({
        message: nocitesRes,
        page: 0,
        totalHits: 0,
        favoriteList: nocitesRes,
        limit,
      });
    } else {
      if (search) {
        const filterFavoritrNotices = (notices, search) => {
          const filteredNocites = notices.filter(
            notice =>
              notice.title.toLowerCase().includes(search.toLowerCase()) ||
              notice.comments.toLowerCase().includes(search.toLowerCase())
          );
          return filteredNocites;
        };
        nocitesRes = filterFavoritrNotices(favoriteList, search);

        let paginFavoriteList = [];
        if (nocitesRes.length > limit && page > 1) {
          const end =
            nocitesRes.length > page * limit
              ? page * limit - 1
              : page * limit - (page * limit - nocitesRes.length);

          paginFavoriteList = nocitesRes.slice(skip, end);

          res.json({
            message: paginFavoriteList,
            favoriteList,
            page,
            totalHits: nocitesRes.length,
            search,
            limit,
          });
        } else {
          paginFavoriteList = nocitesRes.slice(0, limit);
          res.json({
            message: paginFavoriteList,
            favoriteList,
            page,
            totalHits: nocitesRes.length,
            search,
            limit,
          });
        }
      } else {
        let paginFavoriteList = [];
        if (favoriteList.length > limit && page > 1) {
          const end =
            favoriteList.length > page * limit
              ? page * limit - 1
              : page * limit - (page * limit - favoriteList.length);
          console.log('end', end);
          paginFavoriteList = favoriteList.slice(skip, end);

          res.json({
            message: paginFavoriteList,
            favoriteList,
            page,
            totalHits: favoriteList.length,
            search,
            limit,
          });
        } else {
          paginFavoriteList = favoriteList.slice(0, limit);
          res.json({
            message: paginFavoriteList,
            favoriteList,
            page,
            totalHits: favoriteList.length,
            search,
            limit,
          });
        }
      }
    }
  }
};
module.exports = getFavoriteNotices;
