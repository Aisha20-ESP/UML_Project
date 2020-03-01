import React, { Component } from 'react';
import axios from 'axios'
import {MdArrowForward} from 'react-icons/md'
import user from '../images/user.png'
import lock from '../images/lock.png'
import "../css/connexion.css"
import background from '../images/background.png'

class Connection extends Component {
    constructor(){
        super()
        this.state = { 
            login:'',
            password:'',
            formCorrect:true
         }
    }

    componentDidMount(){
        localStorage.clear()
    }

     handleChange= async e => {
         let {value,name}=e.target
        this.setState({[name]:value})
      }
      handleResponse= resp=>{
          resp=resp[0]
        if (typeof(resp)==='string' || resp===false ||(resp)===undefined){
            this.setState({formCorrect:false})
        }  
        else{
            if (resp['id_prof']){
                localStorage.setItem('idProf',resp[1])
                localStorage.setItem("nomProf",resp[0])
                this.props.history.push('/')
            }
            else if(resp['id_etudiant']){
                localStorage.setItem('ide',resp[0]['id_etudiant'])
                this.props.history.push('/')
            } 
        } 

    }


      handleConnect= event =>{
          event.preventDefault()
          let data=new FormData()
          var headers={
              'Content-Type':'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin":"*"
          }
          console.log(this.state)
          data.append('login',this.state.login)  
          data.append('password',this.state.password)
          axios.post(`https://cors-anywhere.herokuapp.com/https://cahierdetextebd.000webhostapp.com/php/verifconnex.php`,data,headers)
          .then(res=>{
              console.log(res)
             this.handleResponse(res.data)
            })
          .catch(res=>console.log(res))
          
      }
      handleLostlogin=event=>{
          event.preventDefault()
          alert('mot de passe oublie')
      }

    render() { 
       
        return ( 
            <div className="container-fluid">
                <div  className='container-fluid' style={style.bgConnec}>
                    <div className="container-fluid box">
                        <h1 className="container title-s">Ecole Superieure Polytechnique De Dakar</h1>
                        <h4 className='container subtitle '>Departement Genie Informatique</h4>
                    </div>
                </div>
                <div  className="row container-fluid d-flex flex-column align-content-center box2">
                    <div className="card col-md-4 col-10 col-xl-4 container cardConnec">
                        <h5 style={style.connect} className="card-title text-uppercase text-center pt-3 mt-3 ">connection</h5>
                        <div className="m-2" style={style.hr}/>
                        
                        <div className="card-body ">
                            <form autoComplete={'true'}className='d-flex flex-column'>
                                {this.state.formCorrect? null:<span style={style.incorrect}>login ou mot de passe incorrect</span> }
                            <span style={{position:'relative'}}>
                                <input style={style.input} type="text" required={true}  name='login' placeholder='login' value={this.state.login} onChange={this.handleChange} /> 
                                <img src={user} alt=' ' style={style.icon}/>
                                <br/>
                            </span>
                            <span style={{position:'relative'}}>
                                <input style={style.input} type="password" required={true} name='password' placeholder='password' value={this.state.password} onChange={this.handleChange} />
                                <img src={lock} alt =' '  style={style.icon}/>
                            </span>
                            </form>
                            <div className='d-flex p-3 flex-row-reverse'>
        <button style={style.forgot} className='text-muted' onClick={this.handleLostlogin}>mot de passe oublie</button>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={this.handleConnect}  className="rounded-circle d-flex "style={style.submit} > <MdArrowForward  color='white' size={'15px'}/> </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )


}
}
let style= {

    icon:{
        position:'relative',
        left:'40%',
        top:'-35px',
        zIndex:'2'
    }
    ,
    hr:{
        position:"relative",
        width:'20%',
        left:'38%',
        
        height:'2px',
        backgroundColor:'#00adff'
    },
    incorrect:{
        position:"relative",
        textAlign:'center',
        color:'red'
    },

    bgConnec:{
        position:'absolute',
        left:'0%',
        width:'100%',
        backgroundImage:`url(${background})`,
        backgroundFill:'cover',
        backgroundRepeat:'no-repeat',
        height:'80%',
        zIndex:'1',
        color:'#ffffff'
    },
    forgot:{
        position:"relative",
        top:'-30px',
        justifySelf:'self-end',
        background:'none' ,
        border:'none',
        textDecoration:'underline',
        outline:'none',

        
    },

    connect:{
        fontFamily:"Cambria"
    },

    input:{
        position:"relative",
        width:'100%',
        zIndex:'2',
        boxShadow: '0px 4px 13px -10px rgba(0,0,0,1)',
        paddingLeft:'10px',
        height:'40px',
        borderRadius:'45px',
        outline:'none',
        border:'none'
    },
    submit:{
        position:"relative",
        top:'-20px',
        backgroundImage: 'linear-gradient(to bottom, #4a68ff, #0097ff, #00b4f4, #00c7ba, #4ad384)',
        display:'flex',
        justifyContent:'center',
        width:'60px',
        height:'60px',
        outline:'none',
        border:'none',
        alignSelf:'center',
        padding:'2px',
        zIndex:'2',

    }
}
export default Connection;