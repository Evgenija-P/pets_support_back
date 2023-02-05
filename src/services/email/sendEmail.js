const sgMail = require('@sendgrid/mail');


const { SENDGRID_API_KEY, SEND_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: SEND_EMAIL };
    await sgMail.send(email);
    return true;
}

module.exports = sendEmail;