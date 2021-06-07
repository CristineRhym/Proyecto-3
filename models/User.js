const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city: String,
    email: String,
    password: String
})

module.exports= UserModel = mongoose.model("User",UserSchema)