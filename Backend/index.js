const express = require("express");
const path = require("path");
const homeRouter = require("./routers/user");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/blog-application").then(() => {
    console.log("mongo connection established");
});

app.use(express.urlencoded({extended:false}));
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", homeRouter);

app.listen(PORT, () => {
    console.log("Connected to port:" + PORT);
});
