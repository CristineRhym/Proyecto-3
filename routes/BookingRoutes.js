const express = require("express");
const { errorHandler } = require("../middleware");
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

BookingRouter.post("/createBook/", async (req, res, next) => {
    const person = req.user.id
    const { date, apartmentId } = req.body

    if (!apartmentId || !date) {
        return next({
            status: 403,
            message: "Booking not valid"
        })
    }

    let findApartment = await Apartment.findById(apartmentId);
    if (!findApartment) {
        return next({
            status: 403,
            message: "Apartment not found"
        })
    }

    const bookingDate = new Date(date)
    bookingDate.setHours(bookingDate.getHours() + 2)
    const today = new Date()

    if (bookingDate < today) {
        return next({
            status: 403,
            message: "Date not valid"
        })
    }
    let newBooking = new Booking({
        apartment: apartmentId,
        date: bookingDate,
        person,
        status: "reservado"

    })

    let newBookingCreate = await newBooking.save();
    return res.json({
        success: true,
        booking: newBookingCreate
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

BookingRouter.delete("/removeBooking/:id", async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    let findBooking = await Booking.findById(id);

    if (!findBooking) {
        return next({
            status: 403,
            message: "Booking not found"
        })
    }
    if (!userId.equals(findBooking.person)) {
        return next({
            status: 403,
            message: "This is not one of your booking"
        })
    }
    await findBooking.deleteOne();
    return res.json({
        success: true,
        message: "Booking remove correctly"
    })

})


BookingRouter.put("/updateBooking/:id", async (req, res, next) => {
    const { id } = req.params
    const { apartment, date } = req.body

    let findBooking = await Booking.findById(id);

    if (!findBooking) {
        return next({
            status: 403,
            message: "Booking not found"
        })
    }
    if (apartment) {
        const findApartment = await Apartment.findById(apartment)
        if (!findApartment) {
            return next({
                status: 403,
                message: "This aparment not exist"
            })
        }
        findBooking.apartment = apartment
    }

    if (date) {
        const bookingDate = new Date(date)
        bookingDate.setHours(bookingDate.getHours() + 2)
        findBooking.date = bookingDate
    }

    let updatedBooking = await findBooking.save()
    return res.json({
        success: true,
        updatedBooking
    })
})

BookingRouter.put("/updateFinish/", async (req, res, next) => {
    const person = req.user.id
    let allBooking = await Booking.find({ status: "reservado" });

    if (allBooking.length == 0) {
        return next({
            status: 403,
            message: "No hay reservas que mostrar"
        })
    }

    let dateToday = new Date();
    dateToday.setHours(dateToday.getHours() + 2);
    dateToday.setHours(0, 0, 0, 0);

    for (let resetDay of allBooking) {
        if (resetDay.date < dateToday) {
            resetDay.status= "disponible"

           await resetDay.save()
        }

    }
    return res.json({
        success:true,
        message: "Reservas actualizadas"

    })

})
module.exports = BookingRouter;