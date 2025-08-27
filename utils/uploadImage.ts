const multer = require("multer")
import { Request } from 'express';
const uuid = require("uuid")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req: Request, file: any, cb: Function) => {
        const x = uuid.v4() + path.extname(file.originalname)
        cb(null, x)
    },
    destination: (req: Request, file: any, cb: Function) => {
        cb(null, "projects")
    },
})


export default multer({ storage }).single("hero");