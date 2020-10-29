import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home/Home';
import Champs from './components/Champs/Champs';
import Postes from './components/Postes/Postes';
import Fiches from './components/Fiches/Fiches';
import Profil from './components/Profil/Profil';
import Admin from './components/Admin/Admin';
import Page from './components/Page/Page';
import Logout from './components/Logout/Logout';
import MailBox from './components/MailBox/MailBox';

import './assets/css/bootstrap.css';
import './assets/css/custom.css';
import './assets/css/font-awesome.css';

import PanelGroupes from './components/panelGroupes/panelGroupes';
import Pages from './components/Pages/Pages';

class App extends Component {  

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>           
            <Route path="/" component={Home} exact></Route>
            <Route path="/login" component={Admin}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/profil" component={Profil}></Route>
            <Route path="/champs" component={Champs}></Route>            
            <Route path="/panelGroupes" component={PanelGroupes}></Route>
            <Route path="/postes" component={Postes}></Route>
            <Route path="/fiches" component={Fiches}></Route>
            <Route path="/pages" component={Pages}></Route>
            <Route path="/sous-groupe/:groupe" component={Home}></Route>
            <Route path="/page/:page" component={Page}></Route>
          </Switch>
        </BrowserRouter>
        <MailBox />
      </div>
    );
  }
  
}

export default App;









