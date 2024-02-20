const mongoose = require("mongoose")


const adminSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        default: "admin"
    }

})



export default mongoose.model("admin", adminSchema)




