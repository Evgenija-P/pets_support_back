const { Notices } = require('../models/NoticesModel');
const { ctrlWrapper } = require('../../middlewares');
const { errorValidation } = require('../helpers');
const getNoticesListController = async (req, res, next) => {
  //   const {
  //     user: { _id: owner },
  //   } = req;
  //   const { page = 1, limit = 20, favorite = null } = req.query;
  //   const skip = (page - 1) * limit;
  // console.log("favorite", favorite);
  //   const params = favorite ? { owner, favorite } : { owner };
  //   const contactsList = await getContactsList(params, { skip, limit, favorite });
  //   console.log('find!!!');
  const noticesList = await Notices.find();
  res.json({ message: noticesList });
};
const getNoticesByCategory = async (req, res, next) => {
  //   const id = req.params.contactId;
  //   const categoryName = req.params.categoryName;
  const { categoryName = 'sell' } = req.query;
  console.log('categoryName', categoryName);
  const noticesList = await Notices.find({ categoryName: categoryName });
  res.json({ message: noticesList });
};

const addNewNoticesController = async (req, res, next) => {
  //   const {
  //     user,
  //     body: { name, email, phone, favorite },
  //   } = req;
  const {
    body: { name, title, categoryName },
  } = req;
  //   const { _id: owner } = user;
  //   const NewNotices = await addNewContact({ name, email, phone, favorite, owner });
  //   console.log('add!');
  //   console.log('name!', name);
  const NewNotices = new Notices({ name, title, categoryName });
  const result = await NewNotices.save();
  res.status(201).json({ message: result });
};

const noticesByIdController = async (req, res, next) => {
  //   const {
  //     user: { _id: owner },
  //   } = req;
  const id = req.params.noticesId;
  console.log('byId', id);
  // const contact = await Notices.findById(id, owner).populate(
  //   'owner',
  //   'name email'
  // );
  // if (contact === null) {
  //   throw new WrongParametersError(`Contact with id:${id} not found`);
  //   // return res.status(404).json({ message: "Not found" });
  // }
  const notices = await Notices.findById(id);
  if (notices === null) {
    throw errorValidation(404, `Notices with id:${id} not found`);
  }
  res.json({ message: notices });
};
const deleteNoticesController = async (req, res, next) => {
  const id = req.params.noticesId;
  //   const {
  //     user: { _id: owner },
  //   } = req;
  const noticesRemovedById = await Notices.findByIdAndRemove(id);
  //   const contactRemovedById = await Contact.findByIdAndRemove(id, owner);
  if (noticesRemovedById === null) {
    throw errorValidation(404, `Notices with id:${id} not found`);
  }
  res.json({ message: `notices ${noticesRemovedById.name} deleted` });
};
// const contactUpdateController = async (req, res, next) => {
//   const {
//     user: { _id: owner },
//     body: { name, email, phone, favorite },
//   } = req;
//   const id = req.params.contactId;

//   const contactUpdated = await contactUpdate(id, {
//     name,
//     email,
//     phone,
//     favorite,
//     owner,
//   });

//   res.json({ message: contactUpdated });
// };
// const changeContactController = async (req, res, next) => {
//   const {
//     user: { _id: owner },
//     body: { name, email, phone, favorite },
//   } = req;
//   const id = req.params.contactId;
//   const contactUpdated = await changeContact(id, {
//     name,
//     email,
//     phone,
//     favorite,
//     owner,
//   });

//   res.json({ message: contactUpdated });
// };
const changeFavoriteNoticesController = async (req, res, next) => {
  const {
    body,
    //   user: { _id: owner },
  } = req;
  const id = req.params.noticesId;
  // const contactUpdated = await updateStatusContact(id, { ...body, owner });
  //  if (body === {} || body === null) {
  //    throw new WrongParametersError(`"missing field favorite"`);
  //  }
  const { favorite } = body;

  const noticestUpdated = await Notices.findByIdAndUpdate(
    id,
    {
      $set: { favorite },
    },
    { new: true }
  );
  //   if (contactUpdated === null) {
  //     //   return res.status(404).json({ message: "Not found" });
  //     throw new WrongParametersError(`Contact with id:${id} not found`);
  //   }
  //   return contactUpdated;
  console.log('favorite!');
  res.json({ message: noticestUpdated });
};

module.exports = {
  getNoticesByCategory: ctrlWrapper(getNoticesByCategory),
  addNewNoticesController: ctrlWrapper(addNewNoticesController),
  getNoticesListController: ctrlWrapper(getNoticesListController),
  noticesByIdController: ctrlWrapper(noticesByIdController),
  deleteNoticesController: ctrlWrapper(deleteNoticesController),
  changeFavoriteNoticesController: ctrlWrapper(changeFavoriteNoticesController),
};
