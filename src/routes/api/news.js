const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../middlewares');
const { news: ctrl } = require('../../controllers');

router.get('/news', ctrlWrapper(ctrl.getNews));

module.exports = router;
