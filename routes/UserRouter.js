const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const authMiddleware = require("../middleware");

router.post("/", UserController.registerUser);
router.get("/list", authMiddleware, UserController.getList);
router.get('/:id', authMiddleware, UserController.getUserById);

module.exports = router;