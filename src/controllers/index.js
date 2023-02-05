const news = require('./news');
const sponsors = require('./sponsors');
const auth = require('./auth');
const pets = require('./pets');

const {
  getNoticesByCategory,
  addNewNotices,
  getNoticesById,
  deleteNotices,
  addToFavoriteNotices,
  getFavoriteNotices,
  removeFromFavoriteNotices,
  getNoticesByOwner,
  getAllNoticesList,
} = require('./notices');

module.exports = {
  news,
  sponsors,
  auth,
  pets,
  getNoticesByCategory,
  addNewNotices,
  getNoticesById,
  deleteNotices,
  addToFavoriteNotices,
  getFavoriteNotices,
  removeFromFavoriteNotices,
  getNoticesByOwner,
  getAllNoticesList,
};
