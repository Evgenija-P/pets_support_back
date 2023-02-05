const searchIdParamName = params =>
  params.find(paramKey => paramKey.toLowerCase().includes('id'));

module.exports = searchIdParamName;
