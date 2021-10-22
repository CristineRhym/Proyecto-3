import axios from "axios";
import React, { useState } from "react";


function Booking(props) {

    const [date, setDate] = useState("");
    const [apartmentId, setApartmentId] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const body = {  
                date: date,
                apartmentId: apartmentId
            };
            const response = await axios.post("http://localhost:5000/bookings/createBook", { date, apartmentId});

        } 
        catch (err) {

        };

    }
    return (
        <div>
            <label for="start">Fecha de entrada:</label>

            <input type="date" id="start" name="trip-start"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min="2020-01-01" max="2050-12-31">

            </input>
            <button type="submit" className="btn btn-primary"
                onClick={handleClick}>Reservar</button>
        </div>
    );
};

export default Booking;
