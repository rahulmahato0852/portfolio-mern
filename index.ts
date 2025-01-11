import { Request, Response, NextFunction } from 'express';


const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config({ path: "./.env" })
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}


mongoose.connect(process.env.MONGO)

const app = express()
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cors())
app.use(express.static("projects"))

// singing room
app.use("/api/portfolio", require("./routes/userRoute"))
app.use("/api/admin", require("./routes/adminRoute"))


app.use("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
    // res.status(404).json({ message: "No Resource Found" })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message })
})

mongoose.connection.once("open", () => {
    console.log("Mongoose connected");
    app.listen(process.env.PORT, console.log("server running")
    )

})


