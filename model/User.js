"use strict";
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    }
});
module.exports = mongoose.model("emails", userSchema);
