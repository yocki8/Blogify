const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },

        description: {
            type: String,
        },

        coverImageURL: {
            type: String,
            default: "/images/default-blog-image.png",
        },

        body: {
            type: String,
            required: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
