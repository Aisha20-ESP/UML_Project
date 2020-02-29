import React,{Component} from 'react';
import profil from '../images/account.png';
import '../css/Header.css';
import { Link } from 'react-router-dom';

class Header  extends Component {
    render () {
        return (
           <header className="container-fluid">
                <div className="row container-fluid ">
                    <Link to='/' className="col-lg-11 col-md-10 col-9 left">
                    <p className='logo'>ESP</p>  
                    <p className='titre'>Ecole Superieure Polytechnique de Dakar </p>
                    <p className="dep"> Departement Genie informatique </p>
                    </Link>

                    <div className="right col-lg-1 col-md-2 col-2">
                    <Link style={{color:"white"}} to="/Connexion">
                        <img alt='' src={profil} className="imgPProfil"/>
                        <p>Deconnexion</p>
                    </Link>
                    
                    </div>
            </div>
           </header>
        );
    }
}
export default Header;
