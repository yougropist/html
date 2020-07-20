import React, {Component} from 'react';
import Groupe from '../Groupe/Groupe'
import Fiche from '../Fiche/Fiche'

class Container extends Component {

    constructor(props){
        super(props);
        this.state = {
          dataGroupeIndex: [],
          sousGroupe: [],
          fiches: []
        }
        
      }
    
    ficheDetail(id){
        console.log(id)
        this.setState({})
    }

    render(){
        return(
            <div id="page-wrapper" >
                <div id="page-inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Répertoire santé mentale bruxellois</h2>   
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="alert alert-info">
                                Ce répertoire, est destiné à toute personne, usagers, proches et professionnels à la recherche de coordonnées de services en santé mentale en Région de Bruxelles-Capitale.
                                Il est développé et mis à jour par www.pfcsm-opgg.be la Plate-forme de Concertation pour la Santé Mentale de Bruxelles.                            
                                Si vous souhaitez nous faire part d’une remarque, d’un oubli de notre part, ou d’une erreur d’encodage, n’hésitez pas à nous contacter via l’adresse mail suivante : info@pfcsm-opgg.be
                                <br/>
                                <button className="btn btn-warning">Modifier</button>
                                <button className="btn btn-danger">Supprimer</button>    
                            </div>
                            
                        </div>
                    </div>
                    {this.props.fiches.length !== 0 ?
                    <>
                    <ul className="list-group list-champs">
                    <button className="btn btn-success">Ajouter une fiche</button>
                    {
                        this.props.fiches.map((elem, index) => (
                            <Fiche ficheDetail={(id) => this.ficheDetail(id)} data={this.props.fiches[index]} />
                        ))
                    }
                    </ul>
                    </> 
                    :
                    <div className="row text-center pad-top">
                    {
                        this.props.dataGroupeIndex.map((elem, index) => (
                            <Groupe data={this.props.dataGroupeIndex[index]} />
                        ))
                    }
                    </div> 
                    }
                    
                     
                </div> 
            </div>
        ) 
    }
}
    


export default Container