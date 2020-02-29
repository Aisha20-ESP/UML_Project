import React,{Component} from 'react';
import accueil_img from '../images/acueil.png';
import fleche_img from '../images/flech.png';
import '../css/Footer.css';

class Footer  extends Component {
    render () {
        return (
<footer>
    <div>
        <img src={accueil_img} alt='' className="accueil"/>
        <span>Accueil</span>
        <img src={fleche_img} alt='' className="flech"/>
        <span>Dic1 info</span>
    </div>
 </footer>
        );
    }
}
export default Footer ;