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
router.get('/own', authenticate, ctrlWrapper(ctrl.getNoticesByOwner));
router.get('/favorite', authenticate, ctrlWrapper(ctrl.getFavoriteNotices));
router.get('/:categoryName', ctrlWrapper(ctrl.getNoticesByCategory));

router.get('/:categoryName/:noticesId', ctrlWrapper(ctrl.getNoticesById));

router.post(
  '/',
  authenticate,
  upload.single('petImage'),
  validation(schemas.addNoticesSchema),
  ctrlWrapper(ctrl.addNewNotices)
);

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
  ctrlWrapper(ctrl.addToFavoriteNotices)
);

module.exports = router;
