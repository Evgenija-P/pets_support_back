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
const { notices: ctrl } = require('../../controllers');

router.get('/', ctrlWrapper(ctrl.getAllNoticesList));

// router.get('/:noticesId', ctrlWrapper(ctrl.getNoticesById));

router.get('/category/:categoryName', ctrlWrapper(ctrl.getNoticesByCategory));

router.post(
  '/',
  authenticate,
  upload.single('petImage'),
  validation(schemas.addNoticesSchema),
  ctrlWrapper(ctrl.addNewNotices)
);

router.get('/own/favorite', authenticate, ctrlWrapper(ctrl.getFavoriteNotices));

router.get('/own', authenticate, ctrlWrapper(ctrl.getNoticesByOwner));

router.delete(
  '/own/:noticesId',
  authenticate,
  validateId,
  ctrlWrapper(ctrl.deleteNotices)
);

router.patch(
  '/own/:noticesId/favorite',
  authenticate,
  validateId,
  ctrlWrapper(ctrl.removeFromFavoriteNotices)
);

router.post(
  '/own/:noticesId/favorite',
  authenticate,
  validateId,
  // validation(schemas.schemaFavoritePatch),
  ctrlWrapper(ctrl.addToFavoriteNotices)
);

module.exports = router;
