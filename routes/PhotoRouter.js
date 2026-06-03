const express = require("express");
const PhotoController = require("../controllers/PhotoController");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "images/" });

router.get("/photosOfUser/:id", PhotoController.getPhotosOfUser);
router.post("/new", upload.single("uploadedphoto"), PhotoController.addPhoto);
router.delete("/:photoIdDeleted", PhotoController.deletePhoto);
router.put("/:photoIdReplaced", upload.single("uploadedphoto"), PhotoController.replacePhoto);

module.exports = router;
