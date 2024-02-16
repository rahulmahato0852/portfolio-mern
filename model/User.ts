const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    },
    text: {
        required: true,
        type: String
    }

})



export default mongoose.model("emails", userSchema)




