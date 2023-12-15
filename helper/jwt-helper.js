const jwt = require('jsonwebtoken')

async function JsonWebTokenRegister({ payload }) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
    return accessToken
}

async function JsonWebTokenAuth({ token }) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) reject({ name: 'ForbiddenError' })
            else resolve(user)
        })
    })
}

async function JsonWebTokenForgotRegis({ payload }) {
    const accessToken = jwt.sign(payload, process.env.FORGOT_TOKEN_SECRET)
    return accessToken
}

async function JWTResetVerify({ token }) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.FORGOT_TOKEN_SECRET, (err, user) => {
            if (err) reject({ name: 'ForbiddenError' })
            else resolve(user)
        })
    })
}

module.exports = {
    JsonWebTokenRegister,
    JsonWebTokenAuth,
    JsonWebTokenForgotRegis,
    JWTResetVerify
}
