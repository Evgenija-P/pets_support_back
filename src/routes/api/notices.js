const express = require('express');
const router = express.Router();
const { schemas } = require('../../schemas');
const {
  ctrlWrapper,
  authenticate,
  validation,
  validateId,
  upload,
} = require('../../middlewares');
const {
  getNoticesByCategory,
  getAllNoticesList,
  addNewNotices,
  // getNoticesById,
  deleteNotices,
  addToFavoriteNotices,
  getFavoriteNotices,
  removeFromFavoriteNotices,
  getNoticesByOwner,
} = require('../../controllers');

router.get('/', ctrlWrapper(getAllNoticesList));

// router.get('/:noticesId', ctrlWrapper(getNoticesById));

router.get('/category/:categoryName', ctrlWrapper(getNoticesByCategory));

router.post(
  '/',
  authenticate,
  upload.single('petImage'),
  validation(schemas.addNoticesSchema),
  ctrlWrapper(addNewNotices)
);

router.get('/own/favorite', authenticate, ctrlWrapper(getFavoriteNotices));

router.get('/own', authenticate, ctrlWrapper(getNoticesByOwner));

router.delete(
  '/own/:noticesId',
  authenticate,
  validateId,
  ctrlWrapper(deleteNotices)
);

router.patch(
  '/own/:noticesId/favorite',
  authenticate,
  validateId,
  ctrlWrapper(removeFromFavoriteNotices)
);

router.post(
  '/own/:noticesId/favorite',
  authenticate,
  validateId,
  // validation(schemas.schemaFavoritePatch),
  ctrlWrapper(addToFavoriteNotices)
);

module.exports = router;
