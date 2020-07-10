import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home/Home';
import Champs from './components/Champs/Champs';
import panelGroupes from './components/panelGroupes/panelGroupes';
import Postes from './components/Postes/Postes';
import Fiches from './components/Fiches/Fiches';
import Profil from './components/Profil/Profil';
import './assets/css/bootstrap.css';
import './assets/css/custom.css';
import './assets/css/font-awesome.css';

class App extends Component {

  
  render(){
    
    return (
      <div className="App">
        {console.log(888)}
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/profil" component={Profil}></Route>
            <Route path="/champs" component={Champs}></Route>            
            <Route path="/panelGroupes" component={panelGroupes}></Route>
            <Route path="/postes" component={Postes}></Route>
            <Route path="/fiches" component={Fiches}></Route>
            <Route path="/sous-groupe/:groupe" component={Home}></Route>

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;


