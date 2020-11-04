import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import {Redirect} from 'react-router-dom'

class Admin extends Component  {

    constructor(props){
        super(props);
        this.state = {
          data: false,
          redirect: false,
        }
      }
    

      connexion() {
        // console.log("REACT CONNEXION ADMIN: ", this.refs.user.value, this.refs.mdp.value)
        fetch('/connexion', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            user: this.refs.user.value,
            mdp: this.refs.mdp.value
          }),
        })
        .then((res) => {
          if (res.status === 200) {
            // console.log('correct: ',res.status)
            return res.json()
          } 
          else {
            console.log('error: ',res.status)
            return null
          }
        })
        .then(data => {           
          if(data !== false){
            console.log('data :', data)  
            this.setState({redirect: true})   
            window.redirect = true      
          } else {
            console.log("data: ", data)
            this.setState({redirect: false}) 
            window.redirect = false
          }
          
        })
      }

    render(){
      // console.log("panelgroupe render: ", this.state.data)
        return(
          <div>
            <Navbar />
            <Navigation />
            {this.state.redirect !== true ?
              <div id="page-wrapper">
                <div id="page-inner">
                  <div className="row text-center pad-top">
                    <h2>Connexion administrateur</h2>
                    <div style={{marginBottom: 50}}>
                      <input required ref="user" type="text" placeholder="Pseudo" />
                      <input required ref="mdp" type="password" placeholder="Mot de passe" />
                      <button className="btn btn-primary" onClick={() => { this.connexion() } }>Connexion</button>
                    </div> 
                  </div>
                </div>
              </div>
            :
              <Redirect to="/" />
            }      
            <Footer />
          </div>
          
            
        )    
    }
   
}

export default Admin