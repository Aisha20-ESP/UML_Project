import React,{Component} from 'react';
// import Footer from './Footer';
import axios from 'axios';
import Header from './Header';
import '../css/index.css'
import {Link} from 'react-router-dom'



class ChoixCours  extends Component {

    constructor(props){
        super(props)
        this.state = { 
            classe:this.props.location.choix,
            cours:[] ,  
            id_mat:''  
         }
    }


    listeCours(props) {
        const classState=props.classe;
        const liste=classState.map((listcours)=>
            <span key={listcours} className=" choice rounded-circle ">
                <Link to={{
                    pathname:"/choix-action",
                    choix:listcours
                 }} 
                 className="link">{listcours}</Link>
                </span>
        )

        return(
            <div className="row" style={{display:'flex', justifyContent:'center'}}>{liste}</div>
        )
    }
    
componentDidMount(){

    localStorage.setItem('choix-classe',this.state.classe);
    


    if(localStorage.getItem('idProf')===null){
        this.props.history.push('/connexion')
    }

    const fd = new FormData();
    fd.append('codeProf',localStorage.getItem("idProf"));
    fd.append('ref_classe',this.state.classe);
    var headers={
        'Content-Type':'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin":"*"
    }
    axios.post(`http://uml2020.atwebpages.com/getCours.php`,fd,headers)
        .then(result => {
            const tab=result.data.listCours.map(obj=>obj[0]);
            this.setState({cours:tab});
            const id=result.data.id_mat.map(obj=>obj[0]);
            this.setState({id_mat:id});
            console.log(id);
            localStorage.setItem("id_mat",id);
            console.log(this.state)
            
        })
        .catch(error => this.setState({
            error: error.message
        }))
}

    render () {
        console.log(this.state);
        return (
            <div style={{backgroundColor:'#f9f9f9'}} className="container-fluid">
                <Header/>
                {/* <Footer/> */}
                <div className='header' id="header">
                    <div className='row p-5 d-flex flex-column flex-grow align-items-center bg'>
                        <h1><b>Monsieur {localStorage.getItem('nomProf')} </b> - {this.state.classe}</h1>
                        <h2>Voici la liste de vos cours</h2>  
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div style={style.cardCours} className="cardCours">
                            <this.listeCours classe={this.state.cours}/>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

let style= {
    cardCours:{
        minHeight:"300px",
        boxShadow:' 0px 0px 30px -15px rgba(57,43,43,1)',
        borderRadius:'7px',
        zIndex:'2',
        position:'relative',
        top:'-90px',
        width:'90%',
        backgroundColor:'white'
    },

    }

export default ChoixCours ;