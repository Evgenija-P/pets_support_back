const news = require('./news');
const sponsors = require('./sponsors');
<<<<<<< HEAD
const refresh = require('./refreshToken');
=======
const {
  getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
} = require('./noticesControllers');
>>>>>>> main

module.exports = {
  news,
  sponsors,
<<<<<<< HEAD
  refresh,
=======
  getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
>>>>>>> main
};
