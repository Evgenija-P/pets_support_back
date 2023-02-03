const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../middlewares');
const { sponsors: ctrl } = require('../../controllers');

router.get('/sponsors', ctrlWrapper(ctrl.getSponsors));

module.exports = router;
