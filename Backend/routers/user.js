const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.route("/").get((req, res) => {
    res.render("home");
});

router
    .route("/signin")
    .post(async (req, res) => {
        const { fullName, password } = req.body;
        const user = await User.matchPassword(fullName, password);

        console.log("user is ",user);
        res.redirect('/');
    })
    .get((req, res) => {
        res.render("signIn");
    });


router.route('/api').get(async (req,res)=>{
    
    const users = await User.find();
    res.json(users);
})
router
    .route("/signup")
    .post(async (req, res) => {
        const { fullName, email, password } = req.body;

        const user = await User.create({
            fullName,
            email,
            password,
        });

        res.redirect('/');
    })
    .get((req, res) => {
        res.render("signUp");
    });

module.exports = router;
