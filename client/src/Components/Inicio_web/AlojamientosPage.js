import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// const AlojamientosPage = () =>{

//     const [apartments, setApartments] =useState([]);

//     useEffect(() =>{
//         const getApartments = async () =>{
//             const response = await fetch ()
//         }
//     })
// }



const AlojamientosPage = () => {

     const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const getApartments = async () => {
            const response = await axios("http://localhost:5000/apartments");
            setApartments (response.data.apartments);
        };

        getApartments();
    }, []);


    return (
        <div>

            {apartments.map(apartment => {
                return (
                    <Link key={apartment._id} to={`/apartments/${apartment._id}`}>
                        <p> {apartment.name} </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default AlojamientosPage;



// "dev": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""