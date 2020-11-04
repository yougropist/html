import React, {Component} from 'react';
import DetailFiche from '../DetailFiche/DetailFiche';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router'

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
          descFr: '',
          descNl: '',
          nom: '',
          nomNl: '',
          path: [],
          selected: '',
          redirect: false,
          from: '',
        }        
      }

    componentDidMount(){ 
        // console.log(this.props)
        this.selectDescGr()
        if(this.props.match.params.idFiche){
            this.ficheDetail(this.props.match.params.idFiche)
        }       
    }

    selectDescGr(){
        if(this.props.idGroupe !== undefined && this.props.idGroupe !== null){
            fetch('/selectDescGroupe', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                  id: this.props.idGroupe
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
                console.log('data :', data[0].descriptionGroupeFr)   
                this.setState({
                    descFr: data[0].descriptionGroupeFr, 
                    descNl: data[0].descriptionGroupeNl,
                    nom: data[0].nom,
                    nomNl: data[0].nomNl
                }) 
              })
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.match.url === '/' && prevProps.match.url !== this.props.match.url){
            console.log('1')
            this.setState({
                descFr: "", 
                descNl: "",
                nom: "",
                nomNl: ""
            })
            this.setState({detailFiches: []})
        } 
        if(this.props.match.url.startsWith('/sous-groupe') && prevProps.match.url !== this.props.match.url){
            console.log('2')
            this.selectDescGr()
            this.setState({detailFiches: []})
        }   
        if(this.props.match.params.idFiche && prevProps.match.params.idFiche !== this.props.match.params.idFiche){        
            console.log('3')   
            this.selectDescGr()         
            this.ficheDetail(this.props.match.params.idFiche)
        } 
    }
    
    ficheDetail(id){
        this.setState({idFiche: id})
        // console.log("REACT SELECT DETAIL FICHE: ", id)
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
        //   console.log('data :', data)   
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
        // console.log('data champs :', data)
        this.setState({champs: data}) 
        })
    }

    render(){
        console.log(878787, this.state.descFr)
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
                    <div className="row" style={{display: this.state.descFr !== '' && this.state.descNl !== '' ? 'initial' : 'none'}}>
                        <div className="col-lg-12 ">
                            <div className="alert alert-info">
                                <p>{this.state.descFr}</p> 
                            </div>
                        </div>
                    </div>
                    {this.state.detailFiches.length !== 0 ?
                    <>
                    <ul className="list-group list-champs">
                    {                        
                        this.state.champs.map((elem, index) => {
                            // console.log(this.state.champs[index].id, "ZEBI")
                            return this.state.detailFiches[this.state.champs[index].nom] !== '' &&
                            <DetailFiche data={this.state.detailFiches} champs={this.state.champs[index].nom} i={this.state.champs[index].id} />                            
                        })
                    }
                    </ul>
                    </>
                    : this.props.fiches.length !== 0 ?
                    <>
                    <ul className="list-group list-champs">
                    {
                        this.props.fiches.map((elem, index) => (
                            // <Fiche ficheDetail={(id) => this.ficheDetail(id)} data={this.props.} />
                            
                            <li className="list-group-item">
                                <h4>{this.props.fiches[index]["a0"]}</h4>
                                <Link to={`/fiche/${this.props.fiches[index].id}`} ><button className="btn btn-success">Détail</button></Link>                                    
                            </li>
                        ))
                    }
                    </ul>
                    </> 
                    :
                    <div className="row text-center pad-top">                    
                    {this.props.dataGroupeIndex.map((elem, index) => (                     
                        <Link to={`/sous-groupe/${elem.id}` }>
                            <div className="col-xs-12 col-md-6 col-lg-3">
                                <div className="div-square" >
                                    <img src={this.props.dataGroupeIndex[index].icon} alt="Logo" />
                                    <h4>{this.props.dataGroupeIndex[index].nom}</h4>
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                    </div> 
                    }
                    
                     
                </div> 
            </div>
        ) 
    }
}

export default withRouter(Container);