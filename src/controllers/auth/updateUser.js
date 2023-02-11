const { User } = require('../../models')


const updateUser = async (req, res) => {
    const { _id } = req.user;
    const { name, email, phone, city, birthday } = req.body;
    await User.findByIdAndUpdate(_id, { name, email, phone, city, birthday });
    const user = await User.findById(_id);

    res.json({
        status: "Success",
        code: 200,
          data: {
            name: user.name,
            email: user.email,
            birthday: user.birthday,
            phone: user.phone,
            city: user.city,
            avatarURL : user.avatarURL,
        }
    })

}

module.exports = updateUser;