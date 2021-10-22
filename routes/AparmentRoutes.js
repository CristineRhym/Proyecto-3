const express = require("express");
const { nextTick } = require("process");
const { errorHandler } = require("../middleware");
const Apartment = require("../models/Apartment");
const ApartmentRouter = express.Router();
const cloudinary = require('cloudinary');
const fs = require("fs");





//CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//const removeTmp = (path) => {
//   fs.unlink(path, err => {
//      if (err) throw err;
//  })
//}

ApartmentRouter.get("/", (req, res, next) => {
    Apartment.find({}).select("name")
        .then(apartments => {
            return res.json({
                success: true,
                apartments
            });
        }).catch(err => {
            return next({
                status: 500,
                message: err.message
            });
        });
});

ApartmentRouter.get("/find/:id", async (req, res) => {
    const { id } = req.params;

    let apartment = await Apartment.findById(id);
    return res.json({
        success: true,
        apartment
    });

});


//RUTA POST CON IMAGEN

ApartmentRouter.post("/", async (req, res, next) => {

    try {
        const { name, capacity, services, price } = req.body;

        // if (!req.files || Object.keys(req.files).length === 0) {
        //     return res.status(400).json({
        //       success: false,
        //       message: "No se ha cargado ningún archivo",
        //     });
        //   }
        const imagen = req.files.imagen;
        console.log(imagen)

        

        if(imagen.mimetype !== 'image/jpeg' && imagen.mimetype !== 'image/png'){
            removeTmp(imagen.tempFilePath)
            return res.status(400).json({msg: "El formato de la imagen no es admitido!"})
        }
        //  if (imagen.size > 1024 * 1024 * 2) {
        //      removeTmp(imagen.tempFilePath);
        //     return res.status(400).json({
        //         success: false,
        //         message: "Archivo demasiado grande",
        //     });
        // }
        //  if (!name || !capacity || !price) {
        //      return next({
        //          status: 403,
        //          message: "Rellena todos los campos."
        //      });
        //  }; 

        // const newImagen = await cloudinary.uploader.upload(imagen.tempFilePath, { folder: "Posidonia" })

        // removeTmp(imagen.tempFilePath);


        cloudinary.v2.uploader.upload(
            imagen.tempFilePath,
            { folder: "Posidonia" },
            async (err, result) => {
               // console.log("Error: ", err);
               // console.log("Result: ", result);
                if (err) throw err;
                removeTmp(imagen.tempFilePath);


                let apartment = new Apartment({
                    name,
                    imagen: result.secure_url,
                    imagenId: result.public_id,
                    capacity,
                    price
                });
                console.log(apartment)
                await apartment.save()
                
                return res.json({
                    success: true,
                    apartment
                })
            }
        )}
        
    catch (err) {
        return res.status(500).json({msg: err.message})
        }
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
    if (name) {
        findApartment.name = name
    }

    if (capacity) {
        findApartment.capacity = capacity
    }
    if (price) {
        findApartment.price = price
    }
    let updatedApartment = await findApartment.save()
    res.json({
        success: true,
        updatedApartment //como el valor se llama igual (linea 83) no se especifica=En bookingRoutes(linea58)
    })

})

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};


module.exports = ApartmentRouter;