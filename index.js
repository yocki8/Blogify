const express = require("express");
const path = require("path");
const homeRouter = require("./routers/user");
const blogRouter = require("./routers/blog");
const mongoose = require("mongoose");
const cors = require('cors');
const checkCookie = require("./middlewares/auth");
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blog-application").then(() => {
    console.log("mongo connection established");
});

app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(cors());
app.use(express.static("public"));
app.use(checkCookie);


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/",homeRouter);
app.use("/blogs",blogRouter);

app.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
});
