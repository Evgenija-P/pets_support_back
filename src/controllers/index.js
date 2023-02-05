const news = require('./news');
const sponsors = require('./sponsors');
const auth = require('./auth');
const pets = require('./pets');

const {
  getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
} = require('./noticesControllers');

module.exports = {
  news,
  sponsors,
  auth,
  pets,
  getNoticesByCategory,
  addNewNoticesController,
  noticesByIdController,
  deleteNoticesController,
  addToFavoriteNoticesController,
  getFavoriteNotices,
  removeFromFavoriteNotices,
};
