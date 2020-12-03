import React, {Component} from 'react';
import DetailFiche from '../DetailFiche/DetailFiche';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
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

    // generateExcel = () => {
    //     let cols = this.state.champs.map(
    //       (elem, index) => this.state.champs[index].nom
    //     );
    //     let data = this.state.champs.map(
    //       (elem, index) => this.state.detailFiches[`a${index}`]
    //     );
    
    //     cols = cols.filter((col, i) => data[i]);
    //     data = data.filter((val) => !!val);
    
    //     const excelData = [cols, data];
    
    //     const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    //     /* Format */
    //     let objectMaxLength = [];
    //     for (let i = 0; i < cols.length; i++) {
    //       let value = data;
    //       for (let j = 0; j < value.length; j++) {
    //         if (typeof value[j] == "number") {
    //           objectMaxLength[j] = 10;
    //         } else {
    //           objectMaxLength[j] =
    //             objectMaxLength[j] >= value[j].length
    //               ? objectMaxLength[j]
    //               : value[j].length;
    //         }
    //       }
    //     }
    
    //     const wscols = objectMaxLength.map((width) => ({ width }));
    
    //     ws["!cols"] = wscols;
    //     /* END Format*/
    
    //     const wb = XLSX.utils.book_new();
    
    //     XLSX.utils.book_append_sheet(wb, ws, "DetailFiche");
    //     /* generate XLSX file and send to client */
    //     XLSX.writeFile(wb, "DetailFiche.xlsx");
    //   };

    render(){
        // console.log(this.state.detailFiches, this.props.match.params.idFiche, this.props ,878787)
        return(
            <div id="page-wrapper" >
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
                    <SearchBar />
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
                                            
                            <li className="list-group-item">
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
                    <div className="row text-center pad-top">                    
                    {this.props.dataGroupeIndex.map((elem, index) => (                     
                        <Link to={`/sous-groupe/${elem.id}` }>
                            <div className="col-xs-12 col-md-6 col-lg-3">
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
        ) 
    }
}

export default withRouter(Container);