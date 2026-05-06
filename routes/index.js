const express = require("express");
const UserRouter = require("./UserRouter");
const PhotoRouter = require("./PhotoRouter");
const CommentRouter = require("./CommentRouter");
const AdminRouter = require("./AdminRouter");
const authMiddleware = require("../middleware");

const router = function (app) {
    app.use("/admin", AdminRouter);
    app.use("/user", UserRouter);
    app.use("/photos", authMiddleware, PhotoRouter);
    app.use("/", authMiddleware, CommentRouter);
}

module.exports = router;