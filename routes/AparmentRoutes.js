const express = require("express");
const { nextTick } = require("process");
const { errorHandler } = require("../middleware");
const Apartment = require("../models/Apartment");
const ApartmentRouter = express.Router();


ApartmentRouter.get("/", (req, res) => {
    Apartment.find({})
        .then(apartments => {
            res.json({
                success: true,
                apartments
            });
        });
});

ApartmentRouter.get("/find/:id", (req, res) => {
    const { id } = req.params;

    Apartment.findById(id)
        .then(apartment => {
            return res.json({
                success: true,
                apartment
            });
        }).catch(err => {
            return res.status(500).send({
                success: false,
                message: err.message
            });
        });
});

ApartmentRouter.post("/", (req, res, next) => {
    const { name, capacity, services, price } = req.body;

    if (!name || !capacity || !services || !price) {
        return next({
            status: 403,
            message: "Rellena todos los campos."
        });
    }

    let apartment = new Apartment({
        name,
        capacity,
        services,
        price
    })

    apartment.save()
        .then(newApartment => {
            res.json({
                success: true,
                apartment: newApartment
            })
        })
});

ApartmentRouter.put("/update/:id", async (req, res, next) => {
    const { id } = req.params
    const { name, capacity, price } = req.body

    let findApartment = await Apartment.findById(id);

    if (!findApartment) {
        return next({
            status: 403,
            message: "Apartment not found"
        })
    }
if (name){
    findApartment.name= name
}

if(capacity){
    findApartment.capacity=capacity
}
if(price){
    findApartment.price=price
}
let updatedApartment= await findApartment.save()
res.json({
    success:true,
    updatedApartment //como el valor se llama igual (linea 83) no se especifica=En bookingRoutes(linea58)
})

})




module.exports = ApartmentRouter;