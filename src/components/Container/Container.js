import React, {Component} from 'react';
import DetailFiche from '../DetailFiche/DetailFiche';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { ScrollView } from "@cantonjs/react-scroll-view";
// import XLSX from "xlsx";

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
          langue: 'fr',
          i: -1,
          display : false,
          newArray: [],
          tabSelected: 0,
          array: [],
          inputSearch: '',
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
                // console.log('data :', data[0].descriptionGroupeFr)   
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
            // console.log('1')
            this.setState({
                descFr: "", 
                descNl: "",
                nom: "",
                nomNl: ""
            })
            this.setState({detailFiches: []})
        } 
        if(this.props.match.url.startsWith('/sous-groupe') && prevProps.match.url !== this.props.match.url){
            // console.log('2')
            this.selectDescGr()
            this.setState({detailFiches: []})
        }   
        if(this.props.match.params.idFiche && prevProps.match.params.idFiche !== this.props.match.params.idFiche){        
            // console.log('3')
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
    searchFiches(value){     
        this.setState({inputSearch: value})   
        if(document.getElementById('search').value){
          this.setState({display: true, tabSelected: 0})
        } else {
          this.setState({display: false, tabSelected: 0})
        }
        console.log()
        fetch('/searchFiches', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            value: value
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
            // console.log("data :", data)
            this.setState({fiches: data}, this.sliceArray(data))                       
        })        
    }
    nextPage(){        
        if(this.state.tabSelected+1 < this.state.newArray.length){
            this.setState({tabSelected: this.state.tabSelected+1})
            // console.log(this.state.tabSelected, this.state.newArray.length)
        }        
    }
    
    previousPage(){
        // console.log(this.state.tabSelected, 0)
        if(this.state.tabSelected > 0){
            this.setState({tabSelected: this.state.tabSelected-1})
        }
        
    }

    btnBack(){
        if(this.state.display == true){
            document.getElementById('search').value = ''
            this.setState({newArray: [], fiches: [], display: false, tabSelected: 0})
        } else{
            this.props.history.goBack()
        }   
    }

    sliceArray(data){
        this.setState({newArray: [], i: -1})
        data.map((elem, index) => {                      
            if(index > this.state.i){
                this.state.i = index+15                
                this.state.newArray.push(data.slice(index, this.state.i))                                             
            }                                                     
        }) 
        this.setState({array: this.state.newArray[this.state.tabSelected]})
    }

    clickFiche(){
        this.setState({display: false})
        document.getElementById('search').value = ''
    }

    render(){
        // console.log(this.state,878787)
        return(
            <div style={{paddingTop: 0}} id="page-wrapper" >
                <div id="page-inner">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>
                                {this.state.langue === 'fr' ?
                                'Répertoire santé mentale bruxellois'
                                :
                                'Overzicht geestelijke gezondheidszorg in Brussel'
                                }
                            </h2>                                                   
                            <button className="btn btn-primary" onClick={() => { this.setState({langue: 'fr'}) }}>FR</button>
                            <button className="btn btn-primary" onClick={() => { this.setState({langue: 'nl'}) }}>NL</button>
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-lg-12 ">
                            <div className="alert alert-info">
                                {this.state.langue === 'fr' ?
                                `Ce répertoire, est destiné à toute personne, usagers, proches et professionnels à la recherche de coordonnées de services en santé mentale en Région de Bruxelles-Capitale.
                                Il est développé et mis à jour par https://pfcsm-opgg.be/ la Plate-forme de Concertation pour la Santé Mentale de Bruxelles.                            
                                Si vous souhaitez nous faire part d’une remarque, d’un oubli de notre part, ou d’une erreur d’encodage, n’hésitez pas à nous contacter via l’adresse mail suivante : info@pfcsm-opgg.be`
                                :
                                `Dit overzicht is bestemd voor alle personen, gebruikers, naasten en professionnals, die op zoek zijn naar de gegevens van diensten voor geestelijke gezondheid in Brussel-Hoofdstad.
                                Het wordt ontwikkeld en geactualiseerd door het Overlegplatform Geestelijke Gezondheid van Brussel.
                                Indien u een opmerking, correctie of aanvulling heeft, aarzel dan niet om ons deze via het volgende adres over te maken: info@pfcsm-opgg.be`
                                }
                                <br/>   
                            </div>
                        </div>
                    </div>
                    {/* <SearchBar /> */}
                    <div style={{width: '100%', textAlign:'center'}}>
                        <input type="text" id='search' style={{width: 500, textAlign:'center', borderRadius: 15}} placeholder='Recherche' onChange={(e) => {this.searchFiches(document.getElementById('search').value)}} />
                    </div>
                    {this.props.match.url !== '/' &&
                        <button onClick={() => {this.btnBack() }} style={{margin: 5}} className='btn btn-primary'>Retour</button>
                    } 
                    <div style={{display: this.state.display === true ? 'initial' : 'none'}}>
                        {/* {this.state.langue === "fr" ?
                            <h4>Nombre de fiches correspondantes: {this.state.fiches.length}</h4>
                        :    
                            <h4>Aantal overeenkomende records: {this.state.fiches.length}</h4>
                        }      */}
                        <ul style={{paddingLeft:0, marginTop: 30, textAlign: 'center'}}>
                        {
                            <div>
                                {                
                                this.state.newArray.length > 0 &&                                       
                                    this.state.newArray[this.state.tabSelected].map((elem, index) => {
                                        return(
                                            <Link key={elem.id} to={`/fiche/${elem.id}`}  >
                                                <li key={elem.id} style={{flexDirection: 'row' , listStyle: 'none', fontSize:14, backgroundColor: '#d9edf7', marginTop: 5,marginLeft: 0, marginRight: 0}} onClick={() => {this.clickFiche()}}>                  
                                                    <p><b>{elem.a1}</b></p>                     
                                                </li>
                                            </Link>                                           
                                        )             
                                    }) 
                                }
                            </div>                                 
                        }
                        </ul>
                        {this.state.langue === "fr" ?
                            <div style={{textAlign: 'center', marginTop: 20}}>
                                <button style={{display: 'inline-block', float: 'left'}} className='btn btn-primary' onClick={() => this.previousPage()}>Page précédente</button>
                                <h4 style={{display: 'inline-block', backgroundColor: '#d9edf7', padding: 10, borderRadius: 7}}>Page: {this.state.tabSelected+1}/{this.state.newArray.length}</h4>
                                <button style={{display: 'inline-block', float: 'right'}} className='btn btn-primary' onClick={() => this.nextPage()}>Page suivante</button>
                            </div>
                        :    
                            <div style={{textAlign: 'center', marginTop: 20}}>
                                <button style={{display: 'inline-block', float: 'left'}} className='btn btn-primary' onClick={() => this.previousPage()}>Vorige pagina</button>
                                <h4 style={{display: 'inline-block', backgroundColor: '#d9edf7', padding: 10, borderRadius: 7}}>Pagina: {this.state.tabSelected+1}/{this.state.newArray.length}</h4>
                                <button style={{display: 'inline-block', float: 'right'}} className='btn btn-primary' onClick={() => this.nextPage()}>Volgende pagina</button>
                            </div>
                        }
                        
                    </div>
                    <div style={{display: this.state.display === false ? 'initial' : 'none'}}>                                      
                        <div className="row" style={{display: this.state.descFr !== '' && this.state.descNl !== '' ? 'initial' : 'none'}}>
                            <div className="col-lg-12 ">
                                <div className="alert alert-info">
                                    <p>{this.state.langue === 'fr' ?
                                        this.state.descFr
                                        :
                                        this.state.descNl
                                        } 
                                    </p> 
                                </div>
                            </div>
                        </div>
                        {this.state.detailFiches.length !== 0 ?
                        <>
                        <ul className="list-group list-champs">
                        {              
                        this.state.langue === 'fr' ?
                            this.state.champs.map((elem, index) => {
                                // console.log(this.state.champs[index].id, "ZEBI")
                                return this.state.detailFiches[this.state.champs[index].nom] !== '' &&
                                <DetailFiche data={this.state.detailFiches} champs={this.state.champs[index].nom} i={this.state.champs[index].id} />                            
                            })
                        :
                            this.state.champs.map((elem, index) => {
                                // console.log(this.state.champs[index].id, "ZEBI")
                                return this.state.detailFiches[this.state.champs[index].nomNl] !== '' &&
                                <DetailFiche data={this.state.detailFiches} champs={this.state.champs[index].nomNl} i={this.state.champs[index].id} />                            
                            })
                        }
                        {/* <button
                            className="btn btn-success"
                            onClick={this.generateExcel}
                        >
                            Export Excel File
                        </button> */}
                        </ul>
                        </>
                        : this.props.fiches.length !== 0 ?
                        <>
                        <ul className="list-group list-champs">
                        {
                            // console.log(this.props.fiches, "ici"),     
                            this.props.fiches.map((elem, index) => (
                                                
                                <li style={{backgroundColor: '#d9edf7'}} className="list-group-item">
                                    <h4>{elem.a1}</h4>
                                    <Link to={`/fiche/${elem.id}`} ><button className="btn btn-success">
                                        {this.state.langue === 'fr' ?
                                        'Détail'
                                        :
                                        'Zien'
                                        } 
                                    </button></Link>                                    
                                </li>
                            ))
                        }
                        </ul>
                        </> 
                        :
                        <div className="row text-center pad-top" style={{marginLeft: 10, marginRight:10}}>                    
                        {this.props.dataGroupeIndex.map((elem, index) => (  
                            <Link key={elem.id} to={`/sous-groupe/${elem.id}` }>
                                <div className="col-xs-12 col-md-6 col-lg-3" style={{paddingLeft: 0, paddingRight: 0}}>
                                    <div className="div-square" >
                                        <img src={this.props.dataGroupeIndex[index].icon} alt="Logo" />
                                        <h4>
                                        {
                                        this.state.langue === 'fr' ?
                                            this.props.dataGroupeIndex[index].nom
                                        :
                                            this.props.dataGroupeIndex[index].nomNl
                                        } 
                                        </h4>
                                    </div>
                                </div>
                            </Link>     
                        ))
                        }
                        </div> 
                        } 
                    </div> 
                </div> 
            </div>
        ) 
    }
}

export default withRouter(Container);