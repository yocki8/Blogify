const jwt = require("jsonwebtoken");
const secret = "yocki";

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            fullName: user.fullName,
            profileImageURL: user.profileImageURL,
            email: user.email,
        },
        secret
    );
}

function getUser(token) {
    if (!token) return null;
    else return jwt.verify(token, secret);
}

module.exports = { setUser, getUser };  