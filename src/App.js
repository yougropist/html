import React, {Component} from 'react';
import Home from './components/Home/Home';
import Champs from './components/Champs/Champs';
import Groupe from './components/Groupe/Groupe';
import Postes from './components/Postes/Postes';
import Fiches from './components/Fiches/Fiches';
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
            <Route path="/champs" component={Champs}></Route>
            <Route path="/groupe" component={Groupe}></Route>
            <Route path="/postes" component={Postes}></Route>
            <Route path="/fiches" component={Fiches}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;


