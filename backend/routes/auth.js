const express = require("express");
const router = express.Router();
const loginController = require("../controllers/logincontroller");
const registerController = require("../controllers/registerController");

// POST method for registration
router.post("/register", registerController);

// POST method for login
router.post("/login", loginController);

module.exports = router;
