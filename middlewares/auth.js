const { getUser } = require("../service/auth");

async function checkCookie(req, res, next) {
    const uid = await req.cookies.uid;
    const data = getUser(uid);
    if (data) req.user = data;
    return next();
}

module.exports = checkCookie;
