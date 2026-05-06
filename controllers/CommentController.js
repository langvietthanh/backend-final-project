const Photo = require("../db/photoModel");

const getCommentOfUser = async function (req, res) {
    const photos = await Photo.find({});
    try {
        const data = photos.filter(photo => photo.comments.find(comment => comment.user_id.toString() === req.params.id));
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

const addNewComment = async function (req, res) {
    try {
        const photoId = req.params.photo_id;
        const comment = req.body.comment;
        const userId = req.user_id;
        if (!comment || comment.trim() === "") {
            return res.status(400).send({ message: "Comment cannot be empty" });
        }

        const newComment = {
            comment: comment,
            date_time: new Date(),
            user_id: userId
        };
        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).send({ message: "Photo not found" });
        }
        photo.comments.push(newComment);
        await photo.save();
        res.status(200).send();
    } catch (error) {
        res.status(400).send({ message: "Invalid ID format" });
    }
}

const deleteComment = async function (req, res) {
    try {
        const commentId = req.params.comment_id;
        const photoId = req.params.photo_id;
        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).send({ message: "Photo not found" });
        }
        photo.comments.pull(commentId);
        await photo.save();
        res.status(200).send();
    } catch (error) {
        res.status(400).send({ message: "Invalid ID format" });
    }
}

const updateComment = async function (req, res) {
    try {
        const { comment } = req.body;
        const commentId = req.params.comment_id;
        const photoId = req.params.photo_id;
        const photo = await Photo.findById(photoId);
        if (!photo) {
            return res.status(404).send({ message: "Photo not found" });
        }
        const commentNeedEdit = photo.comments.find(c => c._id.toString() === commentId);
        if (!commentNeedEdit) {
            res.status(404).send({ message: "Comment not found" });
        }
        commentNeedEdit.comment = comment;
        commentNeedEdit.date_time = new Date();
        await photo.save();
        res.status(200).send();
    } catch (error) {
        res.status(400).send({ message: "Invalid ID format" });
    }
}

module.exports = {
    getCommentOfUser,
    addNewComment,
    deleteComment,
    updateComment,
};