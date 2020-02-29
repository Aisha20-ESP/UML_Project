import React,{Component} from 'react';
// import Footer from './Footer';
import Header from './Header';
import '../css/index.css'
import {Link} from 'react-router-dom'
import '../css/choix-action.css'



class ChoixAction  extends Component {

    constructor(props){
        super(props)
        this.state = { 
            cours:this.props.location.choix
         }

        //  this.getnbrClasse = this.getnbrClasse.bind(this);
    }


componentDidMount(){
 localStorage.setItem('choix-cours',this.state.cours);
 this.setState({cours:localStorage.getItem('choix-cours')})
 if(localStorage.getItem('idProf')===null){
    this.props.history.push('/connexion')
}
}

render () {
    console.log(this.state);
    return (
        <div style={{backgroundColor:'#f9f9f9'}} className="container-fluid">
            <Header/>
            {/* <Footer/> */}
            <div className='header' id="header">
                <div className='row p-5 d-flex flex-column flex-grow align-items-center bg'>
                    <h1>{localStorage.getItem('choix-classe')} - {localStorage.getItem('choix-cours')}</h1>
                    <h2>Que voulez-vous faire?</h2>  
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div style={style.cardChoix}>
                        <div className="row" style={{display:'flex', justifyContent:'center'}}>
                        <span className="col-md-4 col-6 choice-2 rounded ">
                            <Link to="/" className="link-2" >evolution</Link>
                        </span>
                        <span className="col-md-4 col-6 choice-2 rounded ">
                            <Link to="/Cahier" className="link-2" >Cahier de texte</Link>
                        </span>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

let style= {
    cardChoix:{
        minHeight:"200px",
        boxShadow:' 0px 0px 30px -15px rgba(57,43,43,1)',
        borderRadius:'7px',
        zIndex:'2',
        position:'relative',
        top:'-90px',
        width:'90%',
        backgroundColor:'white',
    },

    }


export default ChoixAction  ;