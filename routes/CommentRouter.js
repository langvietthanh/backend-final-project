const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();


router.get("/commentOfUser/:id", async (req, res) => {
    const photos = await Photo.find({});
    try {
        const data = photos.filter(photo => photo.comments.find(comment => comment.user_id.toString() === req.params.id));
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
})

module.exports = router;