import React, { Component } from 'react';
import axios from 'axios'
import '../css/cahier.css';
import Header from './Header';
// import {Link} from 'react-router-dom'


class Cahier extends Component {
    constructor(props) {
        super(props);
        this.state = {
          text: '',
          id_etudiant: [],
          nom:[],
          prenom: [],
          nbEtudiant: 0,
          date: new Date().getDate()+"/"+(new Date().getMonth()+1)+"/"+new Date().getFullYear()
        }
      }
      
      componentDidMount(){   
        var headers={
          'Content-Type':'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin":"*"
      }
        axios.post("https://cahierdetextebd.000webhostapp.com/php/recupEtudiant.php", headers)
          .then(res => {
            // console.log(res.data);
            const id_etudiant = res.data.id.map(obj=>obj[0]);
            const nom = res.data.nom.map(obj=>obj[0]);
            const prenom = res.data.prenom.map(obj=>obj[0]);
            const nbEtudiant = res.data.nbEtudiant
            this.setState({nbEtudiant:nbEtudiant})
            this.setState({id_etudiant:id_etudiant})
            this.setState({nom:nom})
            this.setState({prenom:prenom})
            console.log(this.state)
          }).catch(result=>console.log(result))
      }

      
  

      handleFormSubmit= event =>{
        console.log(this.state.text);
        event.preventDefault();
        const fd=new FormData();
        const id=localStorage.getItem('id_mat');
        console.log(id);
        fd.append('texte',this.state.text);
        fd.append('id_mat',id)
        for(let i = 0; i < this.state.nbEtudiant[0]; i++){
          fd.append("checklist["+i+"]", this.state.id_etudiant[i])
        }
        var headers={
            'Content-Type':'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Headers": "privatekey"
        }
        axios.post('https://cors-anywhere.herokuapp.com/https://cahierdetextebd.000webhostapp.com/php/remplirCahierText.php',fd,headers)
        .then(result => {
          console.log(result)
          if (result.data.reussi === "true"){
            alert('Données enregistrées!!')
            this.props.history.push('/choix-action')
          }
        }).catch(result=>console.log(result))
        
    }

    listEtudiant(){
      let table = []
      for (let i = 0; i < this.state.nbEtudiant[0]; i++){
        table.push(
          <tr key={i}>
            <td>{this.state.nom[i]}</td>
            <td>{this.state.prenom[i]}</td>
            <td><label className="control control--checkbox">
                  <input type="checkbox"  name={"checklist[" +i+ "]"} className="inputCahier" value={this.state.id_etudiant[i]}/>
                  <div className="control__indicator"></div>
                </label>
            </td>
          </tr>
        )
      }
      return table;
    }
      

    render () {
      return (
          <div className="container-fluid">
              <Header/>
              {/* <Footer/> */}
              <div className='header' id="header">
                  <div className='row p-5 d-flex flex-column flex-grow align-items-center bg'>
                      <h1><b>Cahier de Texte du {this.state.date}</b></h1>
                      <h2>{localStorage.getItem('choix-classe')} - {localStorage.getItem('choix-cours')}</h2>  
                  </div>
                  <div className="container-fluid">
                      <div style={style.cardCahier}>
                        <form style={{width:'80%',textAlign:'center'}}>
                          <textarea id="text" style={style.inputCahier} name="text" placeholder="Evolution du cours" value={this.state.text} onChange={e =>this.setState({text:e.target.value})} required></textarea>
                          <p id="label"> Veuillez marquer les étudiants absents:</p>
                          <table >
                            <thead>
                            <tr>
                              <th> Nom </th>
                              <th> Prenom </th>
                              <th>Absent </th>
                            </tr>
                            </thead>
                            <tbody>
                              {this.listEtudiant()}
                            </tbody>
                          </table>
                          <button type="submit" className="rounded m-5" style={style.submit2} onClick={e => this.handleFormSubmit(e)} value="Submit" >Enregistrer</button>
                      </form>
                      </div>
                  </div>
              </div>
              
          </div>
      );
  }
}

let style= {
  cardCahier:{
      display:'flex',
      justifyContent:'center',
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

inputCahier:{
    margin:'5% 0%',
    // boxShadow: '0px 4px 14px -10px rgba(0,0,0,1)',
    boxShadow:'1px 1px 6px #1ad9e7,1px 1px 2px #4a69ff',
    paddingLeft:'10px',
    height:'100px',
    borderRadius:'0px',
    outline:'none',
    border:'none'
},
submit2:{
    backgroundImage: 'linear-gradient(to top, #1ad9e7, #4a69ff)',
    
},
 
}

export default Cahier;