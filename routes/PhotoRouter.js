const express = require("express");
const PhotoController = require("../controllers/PhotoController");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "images/" });

router.get("/photosOfUser/:id", PhotoController.getPhotosOfUser);
router.post("/commentsOfPhoto/:photo_id", PhotoController.addNewComment);
router.post("/new", upload.single("uploadedphoto"), PhotoController.addPhoto);

module.exports = router;
