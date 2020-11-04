import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
// import "./index.scss"

class Profil extends Component  {

        constructor(props){
          super(props);
          this.state = {
            update: false,
            data: [],
          }
        }

        componentDidMount(){
            if(!window.redirect) {window.location.href='/'}            
            fetch('/getProfil', {method: 'POST'})
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
            // console.log('data :', data)
            this.setState({data: data})      
            })
        }

        update(user, pass){
            console.log(user, pass)
            this.setState({update: false})
            fetch('/updateProfil', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                  user: user,
                  pass: pass
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
            return(
                <div>
                    <Navbar />
                    <Navigation />
                    <div id='page-wrapper'>
                        <div id='page-inner'>
                            <div className="row text-center">
                                <h2>PROFIL ADMINISTRATEUR</h2>
                            </div>            
                            <div>
                                <ul>
                                    <li className="list-group-item">
                                        <input className={this.state.update === true ? 'active':''} id="user"  type='text' disabled={this.state.update === true ? false:true} defaultValue={this.state.data.user} />
                                        <input className={this.state.update === true ? 'active':''} id="password" type='text' disabled={this.state.update === true ? false:true} defaultValue={this.state.data.pass} />
                                        {this.state.update === true ? 
                                        <button onClick={() => this.update(document.getElementById('user').value, document.getElementById('password').value)} className='btn btn-primary'>Valider</button>
                                        :
                                        <button onClick={() => this.setState({update: true})}>Modifier</button>
                                        }
                                    </li>
                                    <li className="list-group-item"><p>Visiteur total</p><p>{this.state.data.visit} </p></li>
                                    <li className="list-group-item"><p>Visiteur du mois</p><p></p></li>
                                    <li className="list-group-item"><p>Visiteur de la semaine</p><p></p></li>
                                    <li className="list-group-item"><p>Visiteur de la journée</p><p></p></li>
                                </ul>
                                
                                
                            </div>      
                                        
                        </div>
                    </div>
                    <Footer />
                </div>
            )   
        }
     
}

export default Profil