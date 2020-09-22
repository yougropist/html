import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import DetailFiche from '../DetailFiche/DetailFiche'
import UpdateFiche from '../UpdateFiche/UpdateFiche';
import './style.css';


class PanelGroupes extends Component  {

    constructor(props){
        super(props);
        this.state = {
          dataGroupeIndex: [],
          sousGroupe:[],
          checked: [],
          value: "",
          updateOn: "",
          delOn: "",
          moveOut: "",
          moveOn: "",
          selected: 0,
          path: [],
          nomFiche: [],
          detailFiche: [],
          idFiche: '',
          champs: [],
          updateFiche: false,
          addGroupe: false,
          newIcon: "",
          addFiche: '',
          listIcon: [
            'fas fa-bed',
            'fas fa-band-aid',
            'fas fa-align-justify',
            'fas fa-building',
            'fas fa-box',
            'fas fa-address-book',
            'fas fa-child',
            'fas fa-ambulance',
            'fas fa-american-sign-language-interpreting',
            'fas fa-adjust',
            'fas fa-address-card',
            'fab fa-android',

          ]
        }
      }

      // componentDidUpdate(prevProps, prevState) {
      //   if(this.state.selected !== prevState.selected && this.state.selected !== 0){
      //     console.log("REACT UPDATE ARBRE PANEL", this.state.selected )
      //     fetch('/path', {
      //       method: 'POST',
      //       headers: new Headers({
      //           'Content-Type': 'application/json',
      //       }),
      //       body: JSON.stringify({
      //         id: this.state.selected
      //       }),
      //     })
      //     .then((res) => {
      //       if (res.status === 200) {
      //         // console.log('correct: ',res.status)
      //         return res.json()
      //       } 
      //       else {
      //         console.log('error: ',res.status)
      //         return null
      //       }
      //     })
      //     .then(data => {
      //       this.setState((prevState => ({path: [...prevState.path, data[0]]})))
      //       // console.log('data :', data)
      //     })
      //   }
      // }

    
      componentDidMount() {
        // console.log("REACT SELECT ALL GROUPE")
        fetch('/allGroupe')
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
        })
      }

      delGroupe(id, index) {
        console.log("REACT DELETE GROUPE: ", id , index)
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
        this.setState({delOn: ""})
      }

      updateGroupe(id, index) {
        console.log("REACT UPDATE GROUPE: ", id)
        this.setState({updateOn: ""})
        fetch('/updateGroupe', {
          method: 'PUT',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            data: {
              id: id,
              nom:this.refs[`nom${index}`].value,
              nomNl:this.refs[`nomNl${index}`].value
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

      addGroupe(nom, nomNl, icon ,id) {
        console.log("REACT SELECT SOUS GROUPE: ", nom, nomNl, icon,id)
        if(id === 0) {
          fetch('/addGroupe', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                nom: nom,
                nomNl: nomNl,
                icon: icon
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
            console.log('data add groupe: ', data)
            this.setState({dataGroupeIndex: data, newIcon: ''})
          })
        } else {
          fetch('/addSousGroupe', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                nom: nom,
                nomNl: nomNl,
                icon: icon,
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
            console.log('data add sous groupe: ', data)
            this.setState({dataGroupeIndex: data})
          })
        }
        
      }

      
      
      moveGroupe(moveOn, elemId) {
        if(moveOn != "" ) {
          if(moveOn != elemId){
            console.log("Move groupe on: ", this.state.moveOn,"out: ", elemId)
            fetch('/moveGroupe', {
              method: 'POST',
              headers: new Headers({
                  'Content-Type': 'application/json',
              }),
              body: JSON.stringify({
                idOn: moveOn,
                idOut: elemId
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
              this.setState({dataGroupeIndex: data, moveOn: ""}) 
            })
          } else {
            this.setState({moveOn: ""}) 
          }
        } else {
          console.log(" else : Move groupe on: ", this.state.moveOn,"out: ", elemId)
          this.setState({moveOn: elemId})
        }        
      }

      

      openGroupe(){        
        fetch('/verifyChild', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: this.state.selected
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
            this.setState({nomFiche: data})
        })
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
          // console.log('data :', data)   
          this.setState({detailFiche: data}) 
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

    refreshPath(index, id){
      console.log(id, this.state.selected, 999)
      if(id === this.state.selected) {
        const array = this.state.path.filter((elem, i) => i<=index )
        this.setState({path: array, selected: id, detailFiche: [],updateFiche: false})
      } else {
        const array = this.state.path.filter((elem, i) => i<=index )
        this.setState({path: array, selected: id, nomFiche: [], detailFiche: [],updateFiche: false,})
      }
    }

    checked(obj){
      if(obj.checked){
        this.setState(prevState => ({
          checked: [...prevState.checked, obj.id]
        }))
      } else {
        const array = this.state.checked.filter(elem => elem !== obj.id)
        // console.log(array, 44)
        this.setState({checked: array})
      }                
    }

    render(){
      console.log(this.state.dataGroupeIndex, 9898)
        return(          
          <div>            
            <Navbar />
            <Navigation />
              <div id="page-wrapper">
                <div id="page-inner">
                  <div className="row text-center">
                  <h2>PANEL DE GESTION DES GROUPES</h2>
                  <div style={{marginBottom: 50}}>
                      <button className={`btn btn-primary ${this.state.addFiche === true ? "green" : "white"}`} disabled={this.state.nomFiche.length === 0 ? true : false}>Ajouter fiche</button>
                      <button className={`btn btn-primary ${this.state.addGroupe === true ? "green" : "white"}`} disabled={this.state.nomFiche.length !== 0 ? true : false} onClick={() => {this.state.addGroupe === false ? this.setState({addGroupe: true }) : this.setState({addGroupe: false}) }} >Ajouter groupe</button>
                      <button className="btn btn-warning">Déplacer</button>
                      <button className="btn btn-danger">Supprimer</button>
                  </div>  
                  <div style={{display : this.state.addGroupe !== false ? "initial" : "none"}}>
                      <input required ref="nom" type="text" placeholder="Nom" />
                      <input required ref="nomNl" type="text" placeholder="Naam"/>
                      <a  href="#" onClick={() => this.setState({addGroupe: false},  this.addGroupe(this.refs['nom'].value, this.refs['nomNl'].value, this.state.newIcon,this.state.selected))}><i class="fa fa-plus-square fa-2x" aria-hidden="true"></i></a>
                      <div>
                      {
                        this.state.listIcon.map((elem, index) => {
                          return(<><a style={{color: this.state.newIcon !== elem ? 'yellow' :  'green'  }} onClick={() => {this.setState({newIcon: elem})}} > <i  className={`${this.state.listIcon[index]} fa-2x `} />  </a></> )                        
                        })
                      }
                      </div>                      
                  </div>  
                  <ul className="path" style={{borderRadius: 7, backgroundColor: '#f3f3f3' }}>
                    <li className="pathItem" onClick={() => {console.log(111);this.setState({selected: 0,updateFiche: false, path: [], nomFiche: []},  () => console.log(222))}}><a href='#'><i className="fa fa-home fa-2x" aria-hidden="true"></i></a></li> 
                    {
                      this.state.path.map((elem, index) => {                        
                        return( <li className="pathItem" onClick={() => {this.refreshPath(index, elem.id); console.log("test")}}> <a href='#'>{elem.nom}</a></li>)
                      })
                    }
                  </ul>
                  <ul className="list-group list-champs">
                  <div style={{display : this.state.moveOn !== "" ? "initial" : "none"}}><a onClick={() => this.state.moveOn !== "" ? this.moveGroupe(this.state.moveOn, 0) : this.moveGroupe(this.state.moveOn, 0) } href='#'><i style={{color: "#2bb800"}} className="fa fa-home fa-2x" aria-hidden="true"></i></a></div>     
                        <div>  
                          {
                          this.state.nomFiche.length === 0 ? 
                          this.state.dataGroupeIndex.map((elem, index) => {
                            return (
                              <>
                              <li className={`list-group-item ${elem.id_categorie !== this.state.selected && "hidden" }`} >  
                                <i className={`${elem.icon} fa-2x`} style={{color: "#f3ca12"}} ></i>
                                <input ref={`nom${index}`} className={this.state.updateOn === elem.id ? "active" : undefined} disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nom}/>
                                <input ref={`nomNl${index}`} className={this.state.updateOn === elem.id ? "active" : undefined } disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nomNl}/>
                                <div>
                                  <a className={this.state.updateOn === elem.id ? "green" : "white"} onClick={() => this.state.updateOn !== elem.id ? this.setState({updateOn: elem.id}) : this.updateGroupe(elem.id, index) } > <i className={`fa fa-magic fa-2x `} aria-hidden="true"></i>   </a>
                                  <a className={this.state.moveOn === "" ? "white" : this.state.moveOn === elem.id ? "red" : "green"} onClick={() => this.state.moveOn !== elem.id ? this.moveGroupe(this.state.moveOn, elem.id) : this.moveGroupe(this.state.moveOn, elem.id) }> <i className="fa fa-folder fa-2x" aria-hidden="true" />  </a> 
                                  <a className={this.state.delOn === elem.id ? "green" : "white"} onClick={() => this.state.delOn !== elem.id ?  this.setState({delOn: elem.id}) : this.setState({delOn: ""})}><i className={`fa fa-trash fa-2x`} aria-hidden="true" /></a>
                                  <a className="white" onClick={() => this.setState((prevState => ({path: [...prevState.path, elem], selected: elem.id})), () => this.openGroupe()) } > <i className={`fa fa-arrow-down fa-2x`} aria-hidden="true" />   </a>
                                  <input type="checkbox" onChange={(e) => this.checked({id: elem.id, checked: e.target.checked}) } />
                                </div>
                              </li>
                              <div style={{display: this.state.delOn === elem.id ? "initial" :  "none"}}>
                                <p>Êtes vous sur?</p>
                                <button onClick={() => this.delGroupe(elem.id, index) } className="btn btn-success">Oui</button>
                                <button onClick={() => this.setState({delOn: ""})} className="btn btn-danger">Non</button>
                              </div>
                              <div style={{display: this.state.updateOn === elem.id ? "initial" :  "none"}}>
                                {
                                  this.state.listIcon.map((elem, index) => {
                                    return(<><a style={{color: this.state.newSousIcon !== elem ? 'yellow' :  'green'  }} onClick={() => {this.setState({newIcon: elem})}} > <i  className={`${this.state.listIcon[index]} fa-2x `} />  </a></> )                        
                                  })
                                }
                              </div>
                              </>
                              ) } )
                          : this.state.detailFiche.length === 0 ?
                          this.state.nomFiche.map((elem, index) => {
                            return(
                              <li className="list-group-item" >  
                                <p style={{textAlign: 'left', width:300}}>{elem.Nom}</p>
                                <p style={{textAlign: 'left', width:100}}>{elem['Code postal']}</p>
                                <div>
                                  <a className={this.state.updateOn === elem.id ? "green" : "white"} onClick={() => this.setState({updateFiche: true}, this.ficheDetail(elem.id)) } > <i className={`fa fa-magic fa-2x `} aria-hidden="true"></i>   </a>
                                  <a className={this.state.moveOn === "" ? "white" : this.state.moveOn === elem.id ? "red" : "green"} onClick={() => console.log("move fiche") }> <i className="fa fa-folder fa-2x" aria-hidden="true" />  </a> 
                                  <a className={this.state.delOn === elem.id ? "green" : "white"} onClick={() => console.log("delete fiche")}><i className={`fa fa-trash fa-2x`} aria-hidden="true" /></a>
                                  <a className="white" onClick={() => this.ficheDetail(elem.id) } > <i className={`fa fa-arrow-down fa-2x`} aria-hidden="true" />   </a>
                                  <input type="checkbox" onChange={() =>  console.log("check fiche")} />
                                </div>
                              </li>
                            )
                          }) 
                          : 
                          this.state.updateFiche === false ?
                            this.state.champs.map((elem, index) => {
                              return this.state.detailFiche[this.state.champs[index].nom] !== '' &&
                              <DetailFiche data={this.state.detailFiche} champs={this.state.champs[index].nom} />
                            })
                          :                          
                            this.state.champs.map((elem, index) => {
                              return (                           
                              <UpdateFiche idFiche={this.state.idFiche} update={this.state.updateFiche} data={this.state.detailFiche} champs={this.state.champs[index].nom} />
                              )
                            })
                          } 
                        </div>       
                      </ul>    
                    </div>
                  </div>
                </div>
              <Footer />
            </div>
          
            
        )    
    }
   
}

export default PanelGroupes
