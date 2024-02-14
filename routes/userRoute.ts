import { addMessage } from "../controller/userController"

const router = require("express").Router()


router
    .post("/send-message", addMessage)



module.exports = router   