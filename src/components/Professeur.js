import React, { Component } from 'react';
import axios from 'axios';

class Professeur extends Component {
    state = { 

     }
    componentDidMount(){
        let data=new FormData()
        var headers={
            'Content-Type':'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin":"*"
        }
        data.append('id',localStorage.getItem('idp'))  
        data.append('check',true)
        axios.post(`https://cors-anywhere.herokuapp.com/http://localhost:80/projet-uml/index.php`,data,headers)
        .then(res=>{
            console.log(res)
           this.handleResponse(res.data)
          })
        .catch(res=>console.log(res))
        
    }

    connect(){
        if (localStorage.getItem('idp')===null || localStorage.getItem('idp')===undefined){
            this.props.history.replace('/')
            
            }
    }
    render() { 
        return(

            <div className="">
                {this.connect()}
                Prof <br/>
                <button onClick={
                    (e)=>{
                        e.preventDefault()
                        localStorage.removeItem('idp')
                        this.props.history.replace('/')
                    }
                }>Log Out</button>
            </div>
        )
    }
}
 
export default Professeur;
