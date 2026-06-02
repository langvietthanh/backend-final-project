const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware");
const NoteController = require("../controllers/NoteController");
const multer = require('multer');
const upload = multer({dest: 'images/'}); 

router.get('/', NoteController.getAllNotes);
router.post('/',upload.single('uploadedphoto') ,NoteController.addNewNote);
router.put('/:note_id',upload.single('uploadedphoto'), NoteController.editNote);
router.delete('/:note_id', NoteController.removeNote);

module.exports = router;