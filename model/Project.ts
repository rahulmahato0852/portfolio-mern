import mongoose from "mongoose"


const projectSchema = new mongoose.Schema({
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

})


export default mongoose.model("projects", projectSchema)
