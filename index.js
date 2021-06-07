const express = require("express");
const app = express();
const mongoose = require("mongoose");

require ("dotenv").config();

// importar router
const ApartmentRouter = require("./routes/AparmentRoutes");

const {DB_URI, PORT}=process.env;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected");
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.send({
        success: true,
        message: "Hola, que tal"
    });
});

app.use("/apartments", ApartmentRouter);




app.listen(PORT || 5000, () => console.log('Server started'));