const express = require("express");

const usersController = require("../controllers/users-controllers.js");

const router = express.Router();

router.post("/login", usersController.login);
router.post("/logout", usersController.logout);

module.exports = router;
