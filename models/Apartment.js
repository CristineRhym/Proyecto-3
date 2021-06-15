const mongoose = require("mongoose")

const ApartmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    capacity: Number,
    services: [String],
    price: Number
})

module.exports= ApartmentModel = mongoose.model("Apartment",ApartmentSchema);