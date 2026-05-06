const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.get("/commentOfUser/:id", CommentController.getCommentOfUser);
router.post("/commentsOfPhoto/:photo_id", CommentController.addNewComment);
router.delete("/:photo_id/:comment_id", CommentController.deleteComment);
router.put("/:photo_id/:comment_id", CommentController.updateComment);
module.exports = router;