const express = require("express");
const router = express.Router();
const PhotoController = require("../controllers/PhotoController");
const multer = require('multer');
const upload = multer({dest: 'images/'});

router.get("/photosOfUser/:id", PhotoController.getPhotosOfUser);
router.post("/new", upload.single("uploadedphoto"), PhotoController.addPhoto);

module.exports = router;
