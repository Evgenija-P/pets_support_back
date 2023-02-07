const { User } = require('../../models')


const updateUser = async (req, res) => {
    const { _id } = req.user;
    const { name, email, phone, city, birthday } = req.body;
    await User.findByIdAndUpdate(_id, { name, email, phone, city, birthday });

    res.json({
        status: "Success",
        code: 200,
    })

}

module.exports = updateUser;