"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}
mongoose.connect(process.env.MONGO);
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/portfolio", require("./routes/userRoute"));
app.use("*", (req, res) => {
    res.status(404).json({ message: "No Resource Found" });
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
mongoose.connection.once("open", () => {
    console.log("Mongoose connected");
    app.listen(process.env.PORT, console.log("server running"));
});
