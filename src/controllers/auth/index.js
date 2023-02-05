const signUp = require('./signUp')
const verify = require('./verify')
const signIn = require('./signIn')
const logOut = require('./logOut')
const current = require('./current')
const resendVerificationEmail = require('./resendVerificationEmail')
const avatar = require('./avatar')

module.exports = {
    signUp,
    verify,
    signIn,
    logOut,
    current,
    resendVerificationEmail,
    avatar
}