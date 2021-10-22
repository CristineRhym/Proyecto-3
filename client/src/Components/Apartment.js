import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Booking from "./Inicio_web/DatePicker";
import { Link } from "react-router-dom";


const Apartment = () => {
    const { apartmentId } = useParams();

    const [apartment, setApartment] = useState({});
    
    useEffect(() => {
        const getApartment = async () => {
            const response = await axios(`http://localhost:5000/apartments/find/${apartmentId}`);
            setApartment(response.data.apartment);
        };
        getApartment();
    }, []);

    return (
        <div>
            <p>{apartment._id}</p>
            <p>{apartment.name}</p>
            <p>{apartment.services}</p>
            <p>{apartment.price}</p>
            <p>{apartment.capaciy}</p>
            <Link to="/bookings/createBook" component={Booking} />
        </div>
    );


};
export default Apartment;