import { addProject, deleteProjects, getProjects, loginAdmin, updateProject } from "../controller/adminController"

const router = require("express").Router()


router
    .post("/admin-login", loginAdmin)
    .get("/project", getProjects)
    .post("/add-project", addProject)
    .delete("/delete-project/:id", deleteProjects)
    .put("/update-project/:id", updateProject)







module.exports = router   