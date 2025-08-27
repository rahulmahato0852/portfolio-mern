"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.deleteProjects = exports.getProjects = exports.addProject = exports.loginAdmin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Admin_1 = __importDefault(require("../model/Admin"));
const Project_1 = __importDefault(require("../model/Project"));
const uploadImage_1 = __importDefault(require("../utils/uploadImage"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
exports.loginAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = yield Admin_1.default.findOne({ email });
    console.log(result);
    if (!result) {
        res.status(400).json({ message: "Invalid Email" });
        return;
    }
    if (password !== result.password) {
        res.status(400).json({ message: "Invalid password" });
        // return null
    }
    if (password === result.password) {
        res.json({ message: "Login Success", result: { name: result.name, email: result.email, role: "admin" } });
    }
}));
exports.addProject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImage_1.default)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { title, url, desc, date } = req.body;
        console.log(req.body);
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        const hero = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        yield Project_1.default.create({ title, url, hero, desc, date });
        res.status(201).json({ message: "Project Add Success" });
    }));
}));
exports.getProjects = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Project_1.default.find();
    res.json({ message: "Project Get Success", result });
}));
exports.deleteProjects = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Project_1.default.findById(id);
    if (!result) {
        res.status(400).json({ message: "No record found" });
    }
    if (result) {
        yield promises_1.default.unlink(path_1.default.join(__dirname, "..", "projects", result.hero));
        yield Project_1.default.findByIdAndDelete(id);
        res.json({ message: "Project delete Success" });
    }
}));
exports.updateProject = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, uploadImage_1.default)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        if (req.file) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            console.log("sasa");
            const result = yield Project_1.default.findById(id);
            if (result && result.hero) {
                yield promises_1.default.unlink(path_1.default.join(__dirname, "..", "projects", result.hero));
            }
            yield Project_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, req.body), { hero: req.file.filename }));
            return res.json({ message: "Project update success" });
        }
        yield Project_1.default.findByIdAndUpdate(id, req.body);
        res.json({ message: "Project update success" });
    }));
}));
