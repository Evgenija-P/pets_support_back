// const { News } = require('../../models');

const { errorValidation } = require('../../helpers');

const getNews = async (req, res) => {
  // const news = await News.find();

  // if (!news) {
  //   throw errorValidation(404, 'News not received');
  // }

  res.json({
    status: 'Success',
    code: 200,
    message: 'News received',
    // data: { news },
  });
};

module.exports = getNews;
