import { addProject, deleteProjects, getProjects, loginAdmin } from "../controller/adminController"

const router = require("express").Router()


router
    .post("/admin-login", loginAdmin)
    .get("/project", getProjects)
    .post("/add-project", addProject)
    .delete("/delete-project/:id", deleteProjects)







module.exports = router   