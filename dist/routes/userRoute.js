"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controller/userController");
const router = require("express").Router();
router
    .get("/messages", userController_1.getMessages)
    .post("/send-message", userController_1.addMessage)
    .post("/verify", userController_1.verifyPin);
module.exports = router;
