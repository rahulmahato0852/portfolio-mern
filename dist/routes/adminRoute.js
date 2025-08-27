"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = require("../controller/adminController");
const router = require("express").Router();
router
    .post("/admin-login", adminController_1.loginAdmin)
    .get("/project", adminController_1.getProjects)
    .post("/add-project", adminController_1.addProject)
    .delete("/delete-project/:id", adminController_1.deleteProjects)
    .put("/update-project/:id", adminController_1.updateProject);
module.exports = router;
