const express = require("express");
const { errorHandler} = require("../middleware");
const Apartment = require("../models/Apartment");
const Booking = require("../models/Booking");
const BookingRouter = express.Router();
const User = require("../models/User");


BookingRouter.get("/", (req, res) => {
    Booking.find({})
        .then(bookings => {
            res.json({
                success: true,
                bookings
            });
        });
});

BookingRouter.post("/createBook/",async (req, res, next) => {
     const  person  = req.user.id
     const { date,apartmentId }= req.body

     if (!apartmentId || !date){
        return next({
            status:403,
            message: "Booking not valid"
        })
     }

     let findApartment= await Apartment.findById(apartmentId);
if (!findApartment){
    return next({
        status:403,
        message: "Apartment not found"
    })
}

const bookingDate= new Date (date)
bookingDate.setHours(bookingDate.getHours()+2)
const today= new Date ()

if (bookingDate < today){
    return next({
        status:403,
        message: "Date not valid"
    })
}
let newBooking= new Booking({
apartment:apartmentId,
date:bookingDate,
person

})

let newBookingCreate= await newBooking.save();
return res.json({
    success:true,
    booking:newBookingCreate
})

})

BookingRouter.get("/user/:id", (req, res) => {
    const userId = req.params.id

    User.findById(userId)
        .then(user => {
            Booking.find({ user: userId })
                .then(bookings => {
                    return res.json({
                        success: true,
                        user,
                        bookings
                    });
                });
        });
});

BookingRouter.delete("/removeBook/:id", (req, res) => {
    const { id } = req.params
})

module.exports = BookingRouter;