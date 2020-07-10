import React, {Component} from 'react';
import Home from './components/Home/Home';
import Champs from './components/Champs/Champs';
import panelGroupe from './components/panelGroupes/panelGroupes';
import Postes from './components/Postes/Postes';
import Fiches from './components/Fiches/Fiches';
import Profil from './components/Profil/Profil';
import './assets/css/bootstrap.css';
import './assets/css/custom.css';
import './assets/css/font-awesome.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends Component {

  
  render(){
    
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/profil" component={Profil}></Route>
            <Route path="/champs" component={Champs}></Route>            
            <Route path="/panelGroupes" component={panelGroupe}></Route>
            <Route path="/postes" component={Postes}></Route>
            <Route path="/fiches" component={Fiches}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;


