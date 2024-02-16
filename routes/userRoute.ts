import { addMessage, getMessages, verifyPin } from "../controller/userController"

const router = require("express").Router()


router
    .get("/messages", getMessages)
    .post("/send-message", addMessage)
    .post("/verify", verifyPin)







module.exports = router   