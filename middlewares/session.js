const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    const token = req.cookies['token'];
    if (token) {
        try {

            const user = verifyToken(token);
            req.user = user;
            // !!! it like a context in react - what is in rea.locals is accessable for all rendered pages!!!
            res.locals.user = user;
        } catch (err) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }

    }
    next()
}