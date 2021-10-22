import React, { useState } from "react";
import "./Register.css";
import axios from "axios";


function Register(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const body = {
                email: email,
                password: password             //key:value (en este caso en la ruta de UserRoutes) __Se puede abreviar en: const body ={ email, password} porque se llaman igual
            };
            const response = await axios.post("http://localhost:5000/users/signup", body);

            //Se añade el body
            setSuccessMessage("Usuario creado correctamente")
        }

        catch (err) {

        };
    };

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" />
                </div>
                
                <button type="submit" className="btn btn-primary"
                onClick={handleClick}>SIGN IN</button>
            </form>
            <div className= "alert alert-success mt-2" style={{display: successMessage ? 'block' : 'none'}}>
                {successMessage}
            </div>
        </div>


    );
};



export default Register;