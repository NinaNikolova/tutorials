const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies['token'];
    if (token) {
        try {

            const user = verifyToken(token);
            req.user = user;
            res.locals.user = user;
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }

    }
    next()
}