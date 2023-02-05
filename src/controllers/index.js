const news = require('./news');
const sponsors = require('./sponsors');
const auth = require('./auth');

const {
  getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
  getNoticesByOwner,
} = require('./noticesControllers');

module.exports = {
  news,
  sponsors,
  auth,
  getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
  getNoticesByOwner,
};
