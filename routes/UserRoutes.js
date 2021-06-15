const express = require("express");
const { errorHandler } = require("../middleware");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const { nextTick } = require("process");
const jwt = require ("jsonwebtoken");
const { JWT_SECRET}=process.env;


UserRouter.get("/", (req, res) => {
    User.find({})
        .then(users => {
            res.json({
                success: true,
                users
            });
        });
});


//Signup
UserRouter.post("/signup", async (req, res, next) => {

    try {

        const { email, password } = req.body;
        const findUser= await User.findOne({email});

        if(findUser){
            return next({
                status:403,
                message: "This user already exists"
            })
        }

        if (password.length < 6) {
           return next({
               status:403,
               message:"Passowrd too short"
           })
        }

        let user = new User({
            // name,
            email,
            password,

        })

        let newUser = await user.save();
        const token= jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn:"24h"});
        return res.json({
            success:true,
            token
        })

        
    } catch (error) {
        return next({
            status: 500,
            message: error.message
        });

    }
});

//login
UserRouter.post("/login",async(req,res, next)=>{   //Crear el login, buscar si hay email registrado, y la contraseña
    const {email, password}=req.body;
    // const {body: {email,password}}=req;

    const user= await User.findOne({email});

    if(!user){
        return next({
            status:403,
            message: "Wrong credentials (email)"
        });
    }
const match = await bcrypt.compare(password,user.password);

if (!match){
    return next({
        status:403,
        message: "Wrong credentials (pass)"
    })
}

const token= jwt.sign({id:user._id}, JWT_SECRET, {expiresIn:"24h"});

return res.json({
    success:true,
    token
})
})


module.exports = UserRouter;
