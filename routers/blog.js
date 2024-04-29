const express = require("express");
const Blog = require("../models/blog.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.route("/").get(async (req, res) => {
    const user = req.user;
    const blogs = await Blog.find();
    res.render("blogs", { user, blogs });
});

router
    .route("/add")
    .get((req, res) => {
        const user = req.user;

        if (user) res.render("addBlog", { user });
        else res.render("signup");
    })
    .post(upload.single("coverImage"), async (req, res) => {

        const user = req.user;
        try {
            const { title, description, body } = req.body;

            const blog = await Blog.create({
                title,
                description,
                body,
                createdBy: req.user._id,
                coverImageURL: "/uploads/" + req.file.filename,
            });

            res.render("addBlog",{user});
        } catch (error) {
            console.log(error);
            res.render("addBlog",{user,error});
        }
    });

router.route("/:id").get(async (req,res)=>{
    const title = req.params.id;
    const user = req.user;
    const blog = await Blog.findOne({title});
    res.render("readBlog",{user,blog});
})
module.exports = router;
