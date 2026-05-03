const express = require("express");
const UserRouter = require("./UserRouter");
const PhotoRouter = require("./PhotoRouter");
const CommentRouter = require("./CommentRouter");
const AdminRouter = require("./AdminRouter");

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = decoded.user_id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

const UserController = require("../controllers/UserController");

const router = function (app) {
    app.use("/admin", AdminRouter);
    app.use("/api/user", authMiddleware, UserRouter);
    app.use("/api/photos", authMiddleware, PhotoRouter);
    app.use("/api/comment", authMiddleware, CommentRouter);
}


module.exports = router;