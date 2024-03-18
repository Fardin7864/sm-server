const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js");

router.get("/", usersController.getUsers);
router.post("/add", usersController.addUser);
router.delete("/delete/:id", usersController.deleteUser);
router.patch("/update/:id", usersController.updateUser);

module.exports = router;
