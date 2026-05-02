const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.get("/photosOfUser/:id", async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return response.status(400).send({ message: "User not found" });
    }

    const photos = await Photo.find({ user_id: userId })
      .populate({
        path: "comments.user_id",
        model: "Users",
        select: "_id first_name last_name"
      });

    const formattedPhotos = photos.map(photo => {
      return {
        _id: photo._id,
        user_id: photo.user_id,
        file_name: photo.file_name,
        date_time: photo.date_time,
        comments: photo.comments.map(c => {
          return {
            comment: c.comment,
            date_time: c.date_time,
            _id: c._id,
            user: c.user_id
          };
        })
      };
    });

    response.status(200).send(formattedPhotos);
  } catch (error) {
    response.status(400).send({ message: "Invalid ID format" });
  }
});

module.exports = router;
