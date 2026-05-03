const User = require("../db/userModel");
const Photo = require("../db/photoModel");

const getList = async function (req, res) {
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
}

const getUserById = async function (req, res) {
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
}

const registerUser = async function (req, res) {
    try {
        const { login_name, password, first_name, last_name, location, description, occupation } = req.body;

        if (!login_name || !password || !first_name || !last_name) {
            return res.status(400).send({ message: "login_name, password, first_name, and last_name must be non-empty strings." });
        }

        const existingUser = await User.findOne({ login_name });
        if (existingUser) {
            return res.status(400).send({ message: "login_name already exists." });
        }

        const newUser = new User({
            login_name,
            password,
            first_name,
            last_name,
            location,
            description,
            occupation
        });

        await newUser.save();

        res.status(200).send({
            _id: newUser._id,
            login_name: newUser.login_name,
            first_name: newUser.first_name,
            last_name: newUser.last_name
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}

module.exports = {
    getList,
    getUserById,
    registerUser
};





