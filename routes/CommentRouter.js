const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.get("/commentOfUser/:id", CommentController.getCommentOfUser);

module.exports = router;