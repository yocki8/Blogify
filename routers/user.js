const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { setUser } = require("../service/auth.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/profile"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.route("/").get(async (req, res) => {
    const user = req.user;
    res.render("home", { user });
});

const configureJwtToken = (user, res) => {
    const token = setUser(user);
    res.cookie("uid", token).redirect("/");
};

router
    .route("/signin")
    .post(async (req, res) => {
        try {
            const { fullName, password } = req.body;
            const user = await User.matchPassword(fullName, password);
            configureJwtToken(user, res);
        } catch (error) {
            res.render("signin", { error });
        }
    })
    .get((req, res) => {
        res.render("signIn");
    });

router.route("/api").get(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.route("/logout").get((req, res) => {
    res.clearCookie("uid").redirect("/");
});
router
    .route("/signup")
    .post(upload.single("profileImage"), async (req, res) => {
        try {
            const { fullName, email, password } = req.body;

            const user = await User.create({
                fullName,
                email,
                password,
                profileImageURL: "/profile/" + req.file.filename,
            });

            configureJwtToken(user, res);
        } catch (error) {res.render("signup",{error})}
    })
    .get((req, res) => {
        res.render("signUp");
    });

module.exports = router;
