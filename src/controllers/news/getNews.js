const { News } = require('../../models');

const { errorValidation } = require('../../helpers');

const getNews = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  const news = await News.find().skip(skip).limit(limit);

  if (!news) {
    throw errorValidation(404, 'News not received');
  }

  res.json({
    status: 'Success',
    code: 200,
    message: 'News received',
    data: { news },
  });
};

module.exports = getNews;
