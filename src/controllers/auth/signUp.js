const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const { HttpError } = require('../../helpers')

const { SECRET_KEY } = process.env;

const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    const payload = {
        id: newUser._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
        token,
        status: "Success",
        code: 201,
        data: {
            name: newUser.name,
            email: newUser.email,
            birthday: newUser.birthday,
            phone: newUser.phone,
            city: newUser.city,
            avatarURL: newUser.avatarURL,
        }
    })
    
}

module.exports = signUp;