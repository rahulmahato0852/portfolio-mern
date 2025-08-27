"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    title: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    },
    hero: {
        required: true,
        type: String
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true
    }
});
exports.default = mongoose_1.default.model("projects", projectSchema);
