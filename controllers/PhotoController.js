const Photo = require("../db/photoModel");
const User = require("../db/userModel");

const getPhotosOfUser = async function (req, res) {
    try {

        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).send({ message: "User not found" });
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

        res.status(200).send(formattedPhotos);
    } catch (error) {
        res.status(400).send({ message: "Invalid ID format" });
    }
}

const addNewComment = async function (req, res) {
    try {
        const photoId = req.params.photo_id;
        const comment = req.body.comment;
        const userId = req.user_id;
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

const addPhoto = async function (req, res) {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded" });
        }

        const file = req.file;
        const newPhoto = new Photo({
            file_name: file.filename,
            date_time: new Date(),
            user_id: req.user_id,
            comments: []
        });

        await newPhoto.save();
        res.status(200).send(newPhoto);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getPhotosOfUser,
    addNewComment,
    addPhoto
}   
