const mongoose = require("mongoose")

const ApartmentSchema = new mongoose.Schema({
    name:{
        type: String,
        //required: true
    },
    imagen:{
        type: Object,
        //required:true
    },
    imagenId: {
        type: String,
      },
    capacity: Number,
    services: [String],
    price: Number
})

module.exports= ApartmentModel = mongoose.model("Apartment",ApartmentSchema);