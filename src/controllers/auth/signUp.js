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

    const avatarURL = true;

    const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken, avatarURL });
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`
    }

    await emails.sendEmail(verifyEmail)

    res.status(201).json({
        message: "Successful created",
        user: {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            city: newUser.city
        }
    })
    
}

module.exports = signUp;