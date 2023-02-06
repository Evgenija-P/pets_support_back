const bcrypt = require('bcryptjs');
const {nanoid} = require('nanoid')

const { User } = require('../../models');
const { HttpError } = require('../../helpers')
const {emails} = require('../../services')

const { BASE_URL } = process.env;

const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = nanoid();

    const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken });
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`
    }

    await emails.sendEmail(verifyEmail)

    res.status(201).json({
        status: "Success",
        code: 201,
        data: {
            name: newUser.name,
            email: newUser.email,
            birthday: newUser.birthday,
            phone: newUser.phone,
            city: newUser.city
        }
    })
    
}

module.exports = signUp;