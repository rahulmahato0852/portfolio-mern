"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./.env" });
mongoose.connect(process.env.MONGO);
const app = express();
// app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(express.static("projects"));
// singing room
app.use("/api/portfolio", require("./routes/userRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("*", (req, res) => {
    // res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
    res.sendFile(path.join(__dirname, "public", "index.html"));
    res.status(404).json({ message: "No Resource Found" });
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
mongoose.connection.once("open", () => {
    console.log("Mongoose connected");
    app.listen(process.env.PORT, console.log("server running"));
});
