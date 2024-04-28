const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        salt: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        profileImageURL: {
            type: String,
            default: "/images/default-user.png",
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    user.salt = salt;
    user.password = hashedPassword;

    next();
});

userSchema.static("matchPassword", async function (fullName, password) {
    const user = await User.findOne({ fullName });
    if (!user)
    {
        console.log("user not found");
        return undefined;
    }

    const salt = user.salt;
    const userPassword = user.password;
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    user.password = null;
    user.salt = null;
    if (userPassword !== hashedPassword)
    {
        console.log("User is not genuine");
        return undefined;
    }

    else return user;
});

const User = mongoose.model("user", userSchema);

module.exports = User;
