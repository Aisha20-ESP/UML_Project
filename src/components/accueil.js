import React,{Component} from 'react';
// import Footer from './Footer';
import axios from 'axios';
import Header from './Header';
import '../css/index.css'
import {Link} from 'react-router-dom'



class Accueil  extends Component {

    constructor(){
        super()
        this.state = { 
            idProf:localStorage.getItem('idProf'),
            nom:localStorage.getItem('nomProf'),
            // choixClasse:'',
            classe:[],        
         }
        this.listeClasse = this.listeClasse.bind(this);
    }
    

    listeClasse(props) {
        const classState=props.classe;
        const liste=classState.map((listclass)=>
            <span key={listclass} className=" choice rounded-circle ">
                <Link  to={{
                    pathname:"/choix-cours",
                    choix:listclass
                 }} 
                 className="link">{listclass}</Link>
            </span>
        )
        return(
            <div className="row" style={{display:'flex', justifyContent:'center',height:'100%'}}>{liste}</div>
        )
    }

componentDidMount(){
    if(localStorage.getItem('idProf')===null){
        this.props.history.push('/connexion')
    }
    const fd = new FormData();
    fd.append('codeProf',localStorage.getItem("idProf"));
    var headers={
        'Content-Type':'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin":"*"
    }
    axios.post(`http://uml2020.atwebpages.com/getClasse.php`,fd,headers)
        .then(result => {
            const tab=result.data.list.map(obj=>obj[0]);
            this.setState({classe:tab});
        })
        .catch(error => this.setState({
            error: error.message
        }))

}

    render () {
        return (
            <div className="container-fluid">
                <Header/>
                {/* <Footer/> */}
                <div className='header' id="header">
                    <div className='row p-5 d-flex flex-column flex-grow align-items-center bg'>
                        <h1>Bienvenue, <b>Monsieur {localStorage.getItem('nomProf')} !</b></h1>
                        <h2>Voici la liste de vos classes</h2>  
                    </div>
                    <div className="container-fluid">
                        <div style={style.card}>
                            <this.listeClasse classe={this.state.classe}/>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

let style= {
    card:{
        height:"110%",
        marginBottom:'10%',
        // padding:'3%',
        boxShadow:' 0px 0px 30px -15px rgba(57,43,43,0.6)',
        borderRadius:'7px',
        zIndex:'2',
        position:'absolute',
        left:'4%',
        top:'40%',
        width:'90%',
        backgroundColor:'white'
    },

    }

export default Accueil ;