"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controller/userController");
const router = require("express").Router();
router
    .post("/send-message", userController_1.addMessage);
module.exports = router;
