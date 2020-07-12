import React, {Component} from 'react';
import Groupe from '../Groupe/Groupe'
import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

class PanelGroupes extends Component  {

    constructor(props){
        super(props);
        this.state = {
          dataGroupeIndex: [],
          sousGroupe:[],
          checked: []
        }
      }
    
      componentDidMount() {
        console.log("REACT SELECT ALL GROUPE")
        fetch('/intro', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            data:"ok"
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
          this.setState({dataGroupeIndex: data})
          // console.log('data :', data)    
        })
      }

      delGroupe(id) {
        console.log("REACT DELETE GROUPE: ", id)
        fetch('/delGroupe', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: id
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
          // console.log('data :', data)   
          this.setState({dataGroupeIndex: data}) 
        })
      }

      updateGroupe(id, nom, nomNl) {
        console.log("REACT UPDATE GROUPE: ", id)
        fetch('/updateGroupe', {
          method: 'PUT',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            data: {
              id: id,
              nom: nom,
              nomNl: nomNl
            }
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
          // console.log('data :', data)   
        })
      }

      addGroupe(id) {
        console.log("REACT ADD GROUPE: ", id)
        fetch('/sous-groupe', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            idGroupe: {
              id: id
            }
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
          // console.log('data :', data)   
          this.setState({sousGroupe: data})
        })
      }
      

      checked(obj){
          if(obj.checked){
              this.setState(prevState => ({
                  checked: [...prevState.checked, obj.id]
              }))
          } else {
              const array = this.state.checked.filter(elem => elem !== obj.id)
              console.log(array, 44)
              this.setState({checked: array})
          }                
      }
      
      moveGroupe(id) {
        console.log("move: ", id)
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
                  <h2>PANEL DE GESTION DES GROUPES</h2>
                  <div style={{marginBottom: 50}}>
                      <button className="btn btn-primary">Ajouter</button>
                      <button className="btn btn-warning">Déplacer</button>
                      <button className="btn btn-warning">Dupliquer</button>
                      <button className="btn btn-danger">Supprimer</button>
                  </div>        
                  {

                      this.state.dataGroupeIndex.map((elem, index) => (
                        
                          <Groupe 
                            sousGroupe={this.state.sousGroupe}
                            data={this.state.dataGroupeIndex[index]} 
                            admin={true} 
                            checked={(obj) => this.checked(obj)} 
                            delGroupe={(id) => this.delGroupe(id)}
                            addGroupe={(id) => this.addGroupe(id)}
                            moveGroupe={(id) => this.moveGroupe(id)}
                            addGroupe={(id) => this.addGroupe(id)}
                            updateGroupe={(id, nom, nomNl) => this.updateGroupe(id, nom, nomNl)}
                          />
                      ))
                  }
                  </div>
                </div>
              </div>
            <Footer />
          </div>
          
            
        )    
    }
   
}

export default PanelGroupes