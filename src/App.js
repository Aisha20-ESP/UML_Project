import React, { Component } from 'react'
import Cahier from './components/Cahier'
import Accueil from './components/accueil'
import ChoixAction from './components/ChoixAction'
import ChoixCours from './components/ChoixCours'
import Etudiant from './components/Etudiant'
// import Professeur from './components/Professeur'
import Connexion from './components/Connection'
import {Switch, Route, BrowserRouter} from 'react-router-dom'

class App extends Component {
    render() {
        return ( 
            <BrowserRouter>
                <Switch>
                    <Route path="/choix-action" component={ChoixAction} />
                    <Route path="/choix-cours" component={ChoixCours} />
                    <Route path="/Cahier" component={Cahier} />
                    <Route path='/etudiant' component={Etudiant}/>
                    <Route path='/connexion' component={Connexion}/>
                    <Route path="/" component={Accueil} />
                </Switch>
            </BrowserRouter>
            
         )
    }
}
export default App
