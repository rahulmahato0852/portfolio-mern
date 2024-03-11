import asyncHandler from "express-async-handler"
import { Request, Response } from 'express';
import Admin from "../model/Admin";
import Project from "../model/Project";
import uploadImage from "../utils/uploadImage"
import fs from "fs/promises"
import path from "path";

export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body

    const result = await Admin.findOne({ email })

    console.log(result);
    if (!result) {
        res.status(400).json({ message: "Invalid Email" })
        return
    }

    if (password !== result.password) {
        res.status(400).json({ message: "Invalid password" })
        // return null
    }
    if (password === result.password) {
        res.json({ message: "Login Success", result: { name: result.name, email: result.email, role: "admin" } })
    }
})



export const addProject = asyncHandler(async (req: Request, res: Response) => {
    uploadImage(req, res, async (err: Error) => {
        const { title, url, desc, date } = req.body
        console.log(req.body);

        if (err) {
            return res.status(400).json({ message: err.message })
        }

        const hero = req.file?.filename
        await Project.create({ title, url, hero, desc, date })

        res.status(201).json({ message: "Project Add Success" })
    })
})


export const getProjects = asyncHandler(async (req: Request, res: Response) => {
    const result = await Project.find()
    res.json({ message: "Project Get Success", result })
})


export const deleteProjects = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await Project.findById(id)

    if (!result) {
        res.status(400).json({ message: "No record found" })
    }
    if (result) {
        await fs.unlink(path.join(__dirname, "..", "projects", result.hero))
        await Project.findByIdAndDelete(id)
        res.json({ message: "Project delete Success" })
    }
})



export const updateProject = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err: any) => {
        const { id } = req.params

        if (req.file) {
            if (err) {
                return res.status(400).json({ message: err.message })
            }
            console.log("sasa");

            const result = await Project.findById(id)
            if (result && result.hero) {
                await fs.unlink(path.join(__dirname, "..", "projects", result.hero))
            }
            await Project.findByIdAndUpdate(id, { ...req.body, hero: req.file.filename })
            return res.json({ message: "Project update success" })
        }

        await Project.findByIdAndUpdate(id, req.body)
        res.json({ message: "Project update success" })
    })


})

