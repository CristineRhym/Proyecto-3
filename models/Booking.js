const mongoose = require("mongoose")

const BookingSchema = new mongoose.Schema({
    apartment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment",
        required: true
    },
    date: Date,
    person:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
});

module.exports = BookingModel = mongoose.model("Booking", BookingSchema);