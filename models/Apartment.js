const mongoose = require("mongoose")

const ApartmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description: String,
    place: String,
    service: [String]
})

module.exports= ApartmentModel = mongoose.model("Apartment",ApartmentSchema);