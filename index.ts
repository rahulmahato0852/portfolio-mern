import { Request, Response, NextFunction } from 'express';


const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}


mongoose.connect(process.env.MONGO)

const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/portfolio", require("./routes/userRoute"))


app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "No Resource Found" })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message })
})

mongoose.connection.once("open", () => {
    console.log("Mongoose connected");
    app.listen(process.env.PORT, console.log("server running")
    )

})


