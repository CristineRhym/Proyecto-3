import { Link } from "react-router-dom";

const NavBar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to= "/InicioWeb" className="navbar-brand" href="#">La Posidonia</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/AlojamientosPage" className="nav-item nav-link active" href="#">Alojamientos <span className="sr-only"></span></Link>
                    <Link to="/ReservasPage" className="nav-item nav-link" href="#">Reservas</Link>
                    <Link to="/Register" className="nav-item nav-link" href="#">Registro</Link>
                    <Link to="/Login" className="nav-item nav-link" href="#">Usuario</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar