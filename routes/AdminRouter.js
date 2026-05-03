const express = require("express");
const AdminController = require("../controllers/AdminController.js");
const router = express.Router();

router.post("/login", AdminController.adminLogin);
router.post("/logout", AdminController.adminLogout);

module.exports = router;