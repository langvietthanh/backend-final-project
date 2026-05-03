const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/", UserController.registerUser);
router.get("/list", UserController.getList);
router.get('/:id', UserController.getUserById);

module.exports = router;