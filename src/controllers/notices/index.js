const getNoticesByCategory = require('./getNoticesByCategory');
const addNewNotices = require('./addNewNotices');
const getNoticesById = require('./getNoticesById');
const deleteNotices = require('./deleteNotices');
const addToFavoriteNotices = require('./addToFavoriteNotices ');
const getFavoriteNotices = require('./getFavoriteNotices');
const removeFromFavoriteNotices = require('./removeFromFavoriteNotices');
const getNoticesByOwner = require('./getNoticesByOwner');
const getAllNoticesList = require('./getAllNoticesList.js');
module.exports = {
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
