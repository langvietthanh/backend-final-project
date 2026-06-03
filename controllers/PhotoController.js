const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const fs = require("fs");
const path = require("path");

const getPhotosOfUser = async function (req, res) {
    try {

        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
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

const deletePhoto = async function (req, res) {
    try {
        const id = req.params.photoIdDeleted;
        const photoDelete = await Photo.findByIdAndDelete(id);
        if(!photoDelete) 
            return res.status(404).send({message:"Not found Photo"});

        const filePath = path.join(__dirname, "..", "images", photoDelete.file_name);
        console.log(__dirname);
        console.log(filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return res.status(200).send({message: "Photo deleted success"});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

const replacePhoto = async function (req, res) {
    try {
        const id = req.params.photoIdReplaced;
        const photo = await Photo.findById(id);
        if (!photo) {
            return res.status(404).send({ message: "Photo not found" });
        }
        const file = req.file;
        const filePath = path.join(__dirname, "..", "images", photo.file_name);
        if (fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }
        photo.file_name = file.filename;
        await photo.save();
        return res.status(200).send({message: "Photo replaced success"});
    }
    catch(err){
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getPhotosOfUser,
    addPhoto,
    deletePhoto,
    replacePhoto
}   
