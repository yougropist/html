import React, {Component} from 'react';
import Groupe from '../Groupe/Groupe'

class PanelGroupes extends Component  {

    constructor(props){
        super(props);
        this.state = {
          dataGroupeIndex: []
        }
      }
    
      componentDidMount() {
        console.log("Fonction panel groupe")
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
    render(){
        return(
            <div className="row text-center pad-top">
                <h2>PANEL DE GESTION DES GROUPES</h2>
                <div style={{marginBottom: 50}}>
                    <button className="btn btn-primary">Ajouter</button>
                    <button className="btn btn-warning">Déplacer</button>
                    <button className="btn btn-warning">Modifier</button>
                    <button className="btn btn-warning">Dupliquer</button>
                    <button className="btn btn-danger">Supprimer</button>
                </div>                
                {
                    this.state.dataGroupeIndex.map((elem, index) => (
                        <Groupe data={this.state.dataGroupeIndex[index]} admin={true} />
                    ))
                }
            </div>
        )    
    }
   
}

export default PanelGroupes