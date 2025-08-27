"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const uuid = require("uuid");
const path = require("path");
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const x = uuid.v4() + path.extname(file.originalname);
        cb(null, x);
    },
    destination: (req, file, cb) => {
        cb(null, "projects");
    },
});
exports.default = multer({ storage }).single("hero");
