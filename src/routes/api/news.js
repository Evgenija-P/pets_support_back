const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../helpers');
const { news: ctrl } = require('../../controllers');

router.get('/', ctrlWrapper(ctrl.getNews));

module.exports = router;
