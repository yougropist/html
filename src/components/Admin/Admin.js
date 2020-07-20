import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

class Admin extends Component  {

    constructor(props){
        super(props);
        this.state = {
          data: false
        }
      }
    

      connexion() {
        console.log("REACT CONNEXION ADMIN: ", this.refs.user.value, this.refs.mdp.value)
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
          console.log('data :', data)   
          this.setState({data: data})
        })
      }

    render(){
      // console.log("panelgroupe render: ", this.state.sousGroupe)
        return(
          <div>
            <Navbar />
            <Navigation />
            <div id="page-wrapper">
              <div id="page-inner">
                <div className="row text-center pad-top">
                  <h2>Connexion administrateur</h2>
                  <div style={{marginBottom: 50}}>
                    <input ref="user" type="text" placeholder="Pseudo" />
                    <input ref="mdp" type="text" placeholder="Mot de passe" />
                    <button className="btn btn-primary" onClick={() => { this.connexion() } }>Connexion</button>
                  </div> 
                </div>
              </div>
            </div>
            <Footer />
          </div>
          
            
        )    
    }
   
}

export default Admin