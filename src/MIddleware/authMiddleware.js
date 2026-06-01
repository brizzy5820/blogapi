
const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const token = authHeader.split(' ')[1]?.trim();
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decode.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.error('JWT error:', error.message);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
module.exports = { protect };
