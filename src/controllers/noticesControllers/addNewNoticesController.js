const { Notices } = require('../../models');
// const { ctrlWrapper } = require('../../../middlewares');
// const { errorValidation } = require('../../helpers');
const addNewNoticesController = async (req, res, next) => {
  //   const {
  //     user,
  //     body: { name, email, phone, favorite },
  //   } = req;
  const {
    body: { name, title, categoryName, price, location, sex, birthdate },
  } = req;
  console.log('name', name);
  console.log('title', title);
  console.log('categoryName', categoryName);
  console.log('price', price);
  console.log('location', location);
  console.log('sex', sex);
  console.log('birthdate', birthdate);

  //   const { _id: owner } = user;
  //   const NewNotices = await addNewContact({ name, email, phone, favorite, owner });

  const NewNotices = new Notices({ name, title, categoryName });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

// module.exports = {
//   addNewNoticesController: ctrlWrapper(addNewNoticesController),
// };
module.exports = addNewNoticesController;
