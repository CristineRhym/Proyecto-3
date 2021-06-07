const express= require("express");
const Apartment = require("../models/Apartment");
const ApartmentRouter = express.Router();

ApartmentRouter.get("/", (req,res)=>{
    Apartment.find({})
    .then(apartments =>{
        res.json({
            success:true,
            apartments
        });
    });
});

module.exports = ApartmentRouter;