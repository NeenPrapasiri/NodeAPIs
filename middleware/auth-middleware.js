const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../data/users-data')

function AuthMiddleware(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unsuthorized' });
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Authentication failed.' });
        }

        req.user = user;
        next();
    });
}

async function createTokenMiddleware(req, res, next) {
    const user = await getUserByUsername(req.body.username)
    const { username, password, user_id } = user
    if (req.body.username == username && req.body.password == password) {
        const token = jwt.sign({ user_id, username }, 'your-secret-key', { expiresIn: '1h' });
        res.status(200).json(token);
    } else {
        res.send("Error: username or password is incorrect");
    }
}
module.exports = {
    AuthMiddleware,
    createTokenMiddleware,
}
