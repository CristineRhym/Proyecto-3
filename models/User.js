const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    // name:{
    //     type: String,
    //     required: true
    // },
    email: {
        type: String,
        required:true,
        unique:true,
        trim:true

    },
    password: {
        type:String,
        required:true,
        minLength: 6
    }
});

//Hash password so it can't be seen w/ access to database

UserSchema.pre("save", function (next){
    if (!this.isNew || !this.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err,salt)=>{
        if(err) return next (err);

        bcrypt.hash(this.password, salt, (err,hash)=>{
            if (err) return next (err);

            this.password=hash;

            next();
        });
    });
});

module.exports = mongoose.model("User",UserSchema)