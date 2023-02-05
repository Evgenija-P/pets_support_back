const { User } = require('../../models');
const { HttpError } = require('../../helpers')
const { emails } = require('../../services')

const { BASE_URL } = process.env

const resendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw HttpError(400, "Missing required field email")
    }
    const user = await User.findOne({ email });
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed");
    }
    
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`
    }

    await emails.sendEmail(verifyEmail)

    res.json({
        status: "Success",
        code: 200,
        message: "Verification email sent",
    })
}

module.exports = resendVerificationEmail;