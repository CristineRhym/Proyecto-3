const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { errorHandler, checkToken } = require("./middleware");
const cors = require("cors");
const fileUpload = require("express-fileupload")





require("dotenv").config();

// importar router
const ApartmentRouter = require("./routes/AparmentRoutes");
const BookingRouter = require("./routes/BookingRoutes");
const UserRouter = require("./routes/UserRoutes");

const { DB_URI, PORT } = process.env;

mongoose.connect(DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => {
        console.log("DB connected");
    });

app.use(cors());
app.use (fileUpload({
    useTempFiles:true
}));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/apartments", ApartmentRouter);
app.use("/bookings", checkToken, BookingRouter);
app.use("/users/", UserRouter);

app.use(errorHandler);


app.listen(PORT || 5000, () => console.log('Server started'));