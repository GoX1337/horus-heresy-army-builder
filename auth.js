const jwt = require('jsonwebtoken');
const User = require('./user');

module.exports = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.APISECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Failed to authenticate token.' });
        } else {
            req.user = await User.findById(decoded.userId);
            next();
        }
    });
}