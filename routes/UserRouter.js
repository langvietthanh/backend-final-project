const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
const router = express.Router();

router.get("/list", async (req, res) => {
    try {
        const list = await User.find({}, "_id first_name last_name").lean();
        const photos = await Photo.find({}).lean();
        list.forEach((user) => {
            let photoCount = photos.reduce((sum, photo) => { return sum + (photo.user_id.toString() == user._id.toString() ? 1 : 0) }, 0)
            let commentCount = photos.reduce((sum, photo) => {
                return sum + (photo.comments.reduce((sum, comment) => {
                    return sum + (comment.user_id.toString() == user._id.toString() ? 1 : 0)
                }, 0)
                )
            }, 0)
            user.photo_count = photoCount;
            user.comment_count = commentCount;
        })
        res.status(200).send(list);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
})

router.get('/:id', async (req, res) => {
    try {
        // findById nhận thẳng giá trị id, không phải object { _id: ... }
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        res.status(200).send(user);

    }
    catch (error) {
        res.status(400).send({ error: "Invalid ID" })
    }
})





















// // Return the list of users
// router.get("/list", async (request, response) => {
//     try {
//         const users = await User.find({}, "_id first_name last_name");
//         response.status(200).send(users);
//     } catch (error) {
//         response.status(500).send({ error: error.message });
//     }
// });
// // Return the detailed information of the user
// router.get("/:id", async (request, response) => {
//     try {
//         const user = await User.findById(request.params.id, "_id first_name last_name location description occupation");
//         if (!user) {
//             return response.status(400).send({ message: "User not found" });
//         }
//         response.status(200).send(user);
//     } catch (error) {
//         response.status(400).send({ message: "Invalid ID" });
//     }
// });

module.exports = router;