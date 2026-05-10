const express = require("express");
const UserRouter = require("./UserRouter");
const PhotoRouter = require("./PhotoRouter");
const CommentRouter = require("./CommentRouter");
const AdminRouter = require("./AdminRouter");
const authMiddleware = require("../middleware");

const router = function (app) {
  app.use("/admin", AdminRouter);
  app.use("/api/user", UserRouter);
  app.use("/api/photos", authMiddleware, PhotoRouter);
  app.use("/api/comment", authMiddleware, CommentRouter);
};

module.exports = router;
