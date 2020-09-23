import React, {Component} from 'react';
import Groupe from '../Groupe/Groupe'
import Fiche from '../Fiche/Fiche'
import DetailFiche from '../DetailFiche/DetailFiche'
import SearchBar from '../SearchBar/SearchBar'

class Container extends Component {

    constructor(props){
        super(props);
        this.state = {
          dataGroupeIndex: [],
          sousGroupe: [],
          fiches: [],
          detailFiches: [],
          idFiche: '',
          champs: [],
        }
        
      }
    
    ficheDetail(id){
        this.setState({idFiche: id})
        console.log("REACT SELECT DETAIL FICHE: ", id)
        fetch('/selectFiche', {
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
          console.log('data :', data)   
          this.setState({detailFiches: data}) 
        })
        fetch('/champs')
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
        console.log('data champs :', data) 
        this.setState({champs: data}) 
        })
    }

    render(){
        // console.log(this.state.dataGroupeIndex, 878787)
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
                                Il est développé et mis à jour par <a href="https://pfcsm-opgg.be/">https://pfcsm-opgg.be/</a>  la Plate-forme de Concertation pour la Santé Mentale de Bruxelles.                            
                                Si vous souhaitez nous faire part d’une remarque, d’un oubli de notre part, ou d’une erreur d’encodage, n’hésitez pas à nous contacter via l’adresse mail suivante : <a href="mailto:info@pfcsm-opgg.be">info@pfcsm-opgg.be</a> 
                                <br/>   
                            </div>
                        </div>
                    </div>
                    <SearchBar />
                    {this.state.detailFiches.length !== 0 ?
                    <>
                    <ul className="list-group list-champs">
                    {                        
                        this.state.champs.map((elem, index) => {
                            console.log(this.state.detailFiches[this.state.champs[index].nom])
                            return this.state.detailFiches[this.state.champs[index].nom] !== '' &&
                            <DetailFiche data={this.state.detailFiches} champs={this.state.champs[index].nom} />                            
                        })
                    }
                    </ul>
                    </>
                    : this.props.fiches.length !== 0 ?
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
                            <Groupe data={this.props.dataGroupeIndex[index]}  />
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