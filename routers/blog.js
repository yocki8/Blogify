const express = require("express");
const multer = require("multer");
const Blog = require("../models/blog.js");
const Comment = require("../models/comment.js");
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
    const blogs = await Blog.find().populate("createdBy");
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
                coverImageURL: req.file
                    ? "/uploads/" + req.file.filename
                    : "/images/default-blog-image.png",
            });

            res.redirect("/blogs");
        } catch (error) {
            res.render("addBlog", { user, error });
        }
    });

router.route("/comment/:id").post(async (req, res) => {
    if (req.user) {
        const comment = await Comment.create({
            content: req.body.comment,
            blogID: req.params.id,
            createdBy: req.user,
        });
        const blog = await Blog.findById(req.params.id);
        res.redirect(`/blogs/${blog.title}`);
    } else res.redirect("/signin");
});
router.route("/:id").get(async (req, res) => {
    const title = req.params.id;
    const user = req.user;
    const blog = await Blog.findOne({ title }).populate("createdBy");

    const comments = await Comment.find({
        blogID: blog?._id,
    }).populate("createdBy");

    res.render("readBlog", { user, blog, comments });
});
module.exports = router;
