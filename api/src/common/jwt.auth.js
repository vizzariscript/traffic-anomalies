var jwt = require('jsonwebtoken');

function auth(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
        if (err) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        next();
    });
}

module.exports = auth;