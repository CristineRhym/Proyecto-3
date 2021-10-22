import './assets/css/App.css';
import InicioWeb from './Components/Inicio_web/InicioWeb';
import { 
  Switch, 
  Route, 
  BrowserRouter as Router } from "react-router-dom";
import AlojamientosPage from './Components/Inicio_web/AlojamientosPage';
import NavBar from './Components/Inicio_web/NavBar';
import ReservasPage from './Components/Inicio_web/ReservasPage';
import Apartment from './Components/Apartment'
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
//import DatePicker from 'react-datepicker';

import Booking from './Components/Inicio_web/DatePicker';


const App = () => {
  return (
    <Router>

      <div className="App">
        <NavBar />


        <Switch>

          <Route path="/inicioweb">
              {/* Se puede hacer poniendo un texto dentro */}
            <h2>Home Page</h2>
          </Route>

          <Route path="/alojamientospage">
            {/* Se puede poner un componente dentro (un archivo .js) */}
            <AlojamientosPage />
          </Route>

          <Route path="/reservaspage" component={ReservasPage}></Route>
          {/*<Route path="/ReservasPage" render={}></Route>*/}

          <Route path="/apartments/:apartmentId"> 
            <Apartment/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route> 

          <Route path="/login">
            <Login/>
          </Route>


        </Switch>
      </div>

    </Router>
  );
}

export default App;
