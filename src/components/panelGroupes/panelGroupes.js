import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import DetailFiche from '../DetailFiche/DetailFiche';
import icon1 from '../../assets/img/icone/1.png';
import icon2 from '../../assets/img/icone/2.png';
import icon3 from '../../assets/img/icone/3.png';
import icon4 from '../../assets/img/icone/4.png';
import icon5 from '../../assets/img/icone/5.png';
import icon6 from '../../assets/img/icone/6.png';
import icon7 from '../../assets/img/icone/7.png';
import icon8 from '../../assets/img/icone/8.png';
import icon9 from '../../assets/img/icone/9.png';
import icon10 from '../../assets/img/icone/10.png';
import icon11 from '../../assets/img/icone/11.png';
import icon12 from '../../assets/img/icone/12.png';
import icon13 from '../../assets/img/icone/13.png';
import icon14 from '../../assets/img/icone/14.png';
import icon15 from '../../assets/img/icone/15.png';
import icon16 from '../../assets/img/icone/16.png';
import icon17 from '../../assets/img/icone/17.png';
import icon1a from '../../assets/img/icone/1a.png';
import icon2a from '../../assets/img/icone/2a.png';
import icon3a from '../../assets/img/icone/3a.png';
import icon4a from '../../assets/img/icone/4a.png';
import icon5a from '../../assets/img/icone/5a.png';
import icon6a from '../../assets/img/icone/6a.png';
import icon7a from '../../assets/img/icone/7a.png';
import icon8a from '../../assets/img/icone/8a.png';
import icon9a from '../../assets/img/icone/9a.png';
import icon10a from '../../assets/img/icone/10a.png';
import icon11a from '../../assets/img/icone/11a.png';
import icon12a from '../../assets/img/icone/12a.png';
import icon15a from '../../assets/img/icone/15a.png';
import icon16a from '../../assets/img/icone/16a.png';
import icon17a from '../../assets/img/icone/17a.png';
import icon16b from '../../assets/img/icone/16b.png';
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
          moveFiche: "",
          selected: 0,
          path: [],
          nomFiche: [],
          detailFiche: [],
          idFiche: '',
          champs: [],
          updateFiche: false,
          addGroupe: false,
          newIcon: icon1,
          updateIcon: icon1,
          addFiche: '',
          openAddFiche: false,
          moveStatus: false,
          addFG: "groupe",
          listIcon: [
            icon1,
            icon2,
            icon3,
            icon4,
            icon5,
            icon6,
            icon7,
            icon8,
            icon9,
            icon10,
            icon11,
            icon12
          ],
          listIcona: [
            icon1a,
            icon2a,
            icon3a,
            icon4a,
            icon5a,
            icon6a,
            icon7a,
            icon8a,
            icon9a,
            icon10a,
            icon11a,
            icon12a
          ],
          listIconPanel: [
            icon13,
            icon14,
            icon15,
            icon16,
            icon17
          ],
          listIconPanela: [
            icon15a,
            icon16a,
            icon17a,
            icon16b,
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
          // console.log(this.state.dataGroupeIndex)
          this.setState({dataGroupeIndex: data})
        })
      }

      delGroupe(id, index) {
        // console.log("REACT DELETE GROUPE: ", id , index)
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
          console.log('data :', data)   
          this.setState({dataGroupeIndex: data, delOn: ""}) 
        })
      }

      updateGroupe(id, index, icon) {
        // console.log("REACT UPDATE GROUPE: ", id)
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
              nomNl:this.refs[`nomNl${index}`].value,
              icon:icon
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
          console.log('data :', data)
          this.setState({dataGroupeIndex: data})
        })
      }

      addGroupe(nom, nomNl, icon ,id) {
        console.log(this.state.addFG, 4)
        this.setState({addGroupe: false, addFG: "groupe"})
        console.log(this.state.addFG, 5)
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
            this.setState({dataGroupeIndex: data, newIcon: icon1})
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

      selectSousGroupe(id){
        console.log("selectSousGroupe: ", id)
        fetch('/selectSousGroupe', {
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
          this.setState({dataGroupeIndex: data, moveOn: ""}) 
        })
      }
      
      moveGroupe(moveOn, elemId) {
        console.log(elemId)
        if(this.state.moveStatus === true ){
          console.log("Move FICHE id: ",this.state.moveFiche,"  - id new Groupe :", elemId)
          this.setState({moveStatus: false})
          fetch('/moveFiche', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
              idFiche: this.state.moveFiche,
              idGroupe: elemId
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
            // this.setState({dataGroupeIndex: data, moveOn: ""}) 
          })
        }else {
          if(moveOn !== "" ) {
            if(moveOn !== elemId){
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
                // console.log('data :', data)   
                this.setState({dataGroupeIndex: data, moveOn: ""}) 
              })
            } else {
              this.setState({moveOn: ""}) 
            }
          } else {
            console.log("Move groupe on: ", this.state.moveOn,"out: ", elemId)
            this.setState({moveOn: elemId})
          } 
        }
               
      }

      

      openGroupe(){        
        this.setState({updateIcon: icon1})
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
          console.log("data: ", data.resp)       
          if(data.info === "groupe"){
            this.setState({sousGroupe: data.resp ,addFG: data.info})
          } else if(data.info === "none") {
            this.setState({sousGroupe: data.resp ,addFG: data.info})
          } else if(data.info === "fiche"){
            this.setState({nomFiche: data.resp, addFG: data.info})
          } else {
            this.setState({sousGroupe: data.resp})
          }
          
          
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
        this.getChamps()
    }

    getChamps(){
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

    refreshPath(index, id){
      // console.log(id, index, this.state.path,999)
      if(id === this.state.selected) {
        const array = this.state.path.filter((elem, i) => i<=index )
        this.setState({path: array, selected: id, detailFiche: [],updateFiche: false, openAddFiche: false })        
      } else {
        const array = this.state.path.filter((elem, i) => i<=index )
        this.setState({path: array, selected: id, nomFiche: [], detailFiche: [],updateFiche: false , addFG: "groupe", openAddFiche: false})
      }
    }

    openAddFiche(){
      this.setState({openAddFiche: true})
      this.getChamps()      
    }

    addFiche(){
      this.setState({openAddFiche: false})
    }

    addFiche(){
      const arrayChamps = []
      const arrayValue = []
      this.state.champs.map((elem, index) => {
        const champs = "a"+this.state.champs[index].id
        const value = document.getElementById(this.state.champs[index].nom).value
        arrayChamps.push(champs)
        arrayValue.push(value)
      })    
      console.log('ADD FICHE REACT',  arrayChamps)
      fetch('/addFiche', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          champs: arrayChamps,
          value: arrayValue,
          idGroupe: this.state.selected
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
        console.log('data champs :', data) 
        this.setState({nomFiche: data, openAddFiche: false})
      })
    }

    ficheUpdate(index, idGroupe) {
      const value = document.getElementById('a'+this.state.champs[index].id).value
      const champs ='a'+this.state.champs[index].id
      console.log("REACT UPDATE FICHE: ",champs ,value)
      this.setState({updateOn: ""})
      fetch('/refreshFiches', {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id: this.state.idFiche,
          champs: champs,
          value: value,
          idGroupe: idGroupe
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

    moveFiche(idFiche, moveFiche){
      console.log("MOVE FICHE, idFiche:", idFiche," moveFiche:", moveFiche, "status:", this.state.moveStatus)
      if(idFiche !== moveFiche) {
        // console.log("1UP move fiche: ", moveFiche, "status : ", this.state.moveStatus )
        this.setState({moveStatus: false, moveFiche: idFiche})
        // console.log("2UP move fiche: ", this.state.moveFiche, "status : ", this.state.moveStatus )
      } else {
        // console.log("1DOWN move fiche: ", moveFiche, "status : ", this.state.moveStatus ) 
        this.setState({moveStatus: true, moveFiche: "rien"})
        // console.log("2DOWN move fiche: ", this.state.moveFiche, "status : ", this.state.moveStatus )        
      }
    }
    

    // checked(obj){
    //   if(obj.checked){
    //     this.setState(prevState => ({
    //       checked: [...prevState.checked, obj.id]
    //     }))
    //   } else {
    //     const array = this.state.checked.filter(elem => elem !== obj.id)
    //     // console.log(array, 44)
    //     this.setState({checked: array})
    //   }                
    // }


    render(){
      // console.log(this.state.champs , 9898)
      // console.log(this.state.newIcon, 6666 )
        return(
          <div>
            <Navbar />
            <Navigation />
              <div id="page-wrapper">
                <div id="page-inner">
                  <div className="row text-center">
                  <h2>PANEL DE GESTION DES GROUPES</h2>
                  <div style={{marginBottom: 50}}>
                      <button className={`btn ${this.state.openAddFiche === true ? " btn-danger" : " btn-primary"}`}  disabled={this.state.addFG === "fiche" && this.state.updateFiche === false || this.state.addFG === "none" && this.state.updateFiche === false && this.state.addGroupe === false ? false : true} onClick={() => {this.state.openAddFiche === false ? this.openAddFiche() : this.setState({openAddFiche: false}) }}>{this.state.openAddFiche === true ? "Annuler" : "Ajouter fiche"}</button>
                      <button className={`btn ${this.state.addGroupe === true ? " btn-danger" : " btn-primary"}`}  disabled={this.state.addFG === "groupe" && this.state.updateFiche === false || this.state.addFG === "none" && this.state.updateFiche === false && this.state.openAddFiche === false ?  false : true} onClick={() => {this.state.addGroupe === false ? this.setState({addGroupe: true }) : this.setState({addGroupe: false}) }} >{this.state.addGroupe === true ? "Annuler" : "Ajouter groupe"}</button>
                  </div>  
                  <div style={{display : this.state.addGroupe !== false ? "initial" : "none"}}>
                      <input required id="nom" ref="nom" type="text" placeholder="Nom" />
                      <input required id="nomNl" ref="nomNl" type="text" placeholder="Naam" />
                      <a  href="#" onClick={() => this.addGroupe(document.getElementById('nom').value, document.getElementById('nomNl').value, this.state.newIcon, this.state.selected)}><img  src={this.state.listIconPanel[0]} alt="Logo" /></a>
                      <div>                        
                      {
                        this.state.listIcon.map((elem, index) => {
                          return(<><a onClick={() => {this.setState({newIcon: elem})}} > {this.state.newIcon !== elem ? <img  src={elem} alt="Logo" /> : <img  src={this.state.listIcona[index]} alt="Logo" />}  </a></> )                        
                        }) 
                      }
                      </div>                      
                  </div>  
                  <ul className="path" style={{borderRadius: 7, backgroundColor: '#f3f3f3' }}>
                    <li className="pathItem" onClick={() => {this.setState({path: [], selected: 0, nomFiche: [], detailFiche: [], updateFiche: false , addFG: "groupe", openAddFiche: false})}}><a href='#'><i className="fa fa-home fa-2x" aria-hidden="true"></i></a></li> 
                    {
                      this.state.path.map((elem, index) => {
                        return( <li className="pathItem" onClick={ () => {this.refreshPath(index, elem.id)} }> <a href='#'>{elem.nom}</a></li>)
                      })
                    }
                  </ul>
                  <ul className="list-group list-champs">
                  <div style={{display : this.state.moveOn !== "" ? "initial" : "none"}}><a onClick={() => this.state.moveOn !== "" ? this.moveGroupe(this.state.moveOn, 0) : this.moveGroupe(this.state.moveOn, 0) } href='#'><i style={{color: "#2bb800"}} className="fa fa-home fa-2x" aria-hidden="true"></i></a></div>     
                        <div>  
                          {
                          this.state.nomFiche.length === 0 && this.state.dataGroupeIndex.length > 0 && this.state.openAddFiche === false ? 
                          this.state.dataGroupeIndex.map((elem, index) => {
                            return (
                              <>
                              <li className={`list-group-item ${elem.id_categorie !== this.state.selected && "hidden" }`} > 
                                <img  src={elem.icon} alt="Logo" />
                                <input ref={`nom${index}`} className={this.state.updateOn === elem.id ? "active" : undefined} disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nom}/>
                                <input ref={`nomNl${index}`} className={this.state.updateOn === elem.id ? "active" : undefined } disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nomNl}/>
                                <div>
                                  <a className={this.state.updateOn === elem.id ? "green" : "white"} onClick={() => this.state.updateOn !== elem.id ? this.setState({updateOn: elem.id}) : this.updateGroupe(elem.id, index, this.state.updateIcon) } > {this.state.updateOn !== elem.id ? <img  src={this.state.listIconPanel[4]} alt="Logo" /> : <img  src={this.state.listIconPanela[2]} alt="Logo" /> }   </a>
                                  {/* <a className={this.state.moveOn === "" ? "white" : this.state.moveOn === elem.id ? "red" : "green"} onClick={() => this.state.moveOn !== elem.id ? this.moveGroupe(this.state.moveOn, elem.id) : this.moveGroupe(this.state.moveOn, elem.id) }> {this.state.moveStatus === true && this.state.moveOn !== elem.id  ?  <img  src={this.state.listIconPanela[1]} alt="Logo" /> : this.state.moveOn === "" ? <img  src={this.state.listIconPanel[3]} alt="Logo" /> : this.state.moveOn === elem.id ? <img  src={this.state.listIconPanela[3]} alt="Logo" /> : <img  src={this.state.listIconPanel[3]} alt="Logo" />  }   </a>  */}
                                  <a className={this.state.moveOn === "" ? "white" : this.state.moveOn === elem.id ? "red" : "green"} onClick={() => this.state.moveOn !== elem.id ? this.moveGroupe(this.state.moveOn, elem.id) : this.moveGroupe(this.state.moveOn, elem.id) }> {this.state.moveStatus === false && this.state.moveOn === "" ? <img  src={this.state.listIconPanel[3]} alt="Logo" /> : this.state.moveStatus === true && this.state.moveOn === "" ? <img  src={this.state.listIconPanela[1]} alt="Logo" /> : this.state.moveOn === elem.id ? <img  src={this.state.listIconPanela[1]} alt="Logo" /> : <img  src={this.state.listIconPanela[3]} alt="Logo" /> }   </a> 

                                  <a className={this.state.delOn === elem.id ? "green" : "white"} onClick={() => this.state.delOn !== elem.id ?  this.setState({delOn: elem.id}) : this.setState({delOn: ""})}> {this.state.delOn !== elem.id ?  <img  src={this.state.listIconPanel[2]} alt="Logo" /> :  <img  src={this.state.listIconPanela[0]} alt="Logo" />  }</a>
                                  <a className="white" onClick={() => this.setState((prevState => ({path: [...prevState.path, elem], selected: elem.id})), () => {this.openGroupe()} ) } > <img  src={this.state.listIconPanel[1]} alt="Logo" />   </a>
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
                                    return(<><a onClick={() => {this.setState({updateIcon: elem})}} > {this.state.updateIcon !== elem ? <img  src={elem} alt="Logo" /> : <img  src={this.state.listIcona[index]} alt="Logo" />}  </a></> )                        
                                  })
                                }
                              </div>
                              </>
                            )})
                          :
                          this.state.detailFiche.length === 0 && this.state.nomFiche.length > 0 && this.state.openAddFiche === false ?
                          <>
                          <h2>Listes des fiches</h2>
                            {this.state.nomFiche.map((elem, index) => {
                              // console.log(this.state.moveFiche, elem.id)
                              return(
                                <li className="list-group-item" >  
                                  <p style={{textAlign: 'left', width:300}}>{elem.a0}</p>
                                  <p style={{textAlign: 'left', width:100}}>{elem.a17}</p>
                                  <div>
                                    <a onClick={() => this.setState({updateFiche: true}, this.ficheDetail(elem.id)) } >  <img  src={this.state.listIconPanel[4]} alt="Logo" />  </a>
                                    <a onClick={() => this.state.moveFiche !== elem.id ? this.moveFiche(elem.id, this.state.moveFiche)  : this.moveFiche(elem.id, this.state.moveFiche)  }> {this.state.moveFiche !== elem.id ? <img  src={this.state.listIconPanel[3]} alt="Logo" /> : <img  src={this.state.listIconPanela[3]} alt="Logo" /> }    </a> 
                                    {/* <a onClick={() => this.state.moveFiche !== elem.id  ?  this.moveFiche(elem.id, this.state.moveFiche) : console.log("not") }>   <img  src={this.state.listIconPanela[3]} alt="Logo" />    </a>  */}
                                    <a onClick={() => console.log("delete fiche")}><img  src={this.state.listIconPanel[2]} alt="Logo" /></a>
                                    <a onClick={() => this.ficheDetail(elem.id) } > <img  src={this.state.listIconPanel[1]} alt="Logo" /></a>
                                  </div>
                                </li>
                              )
                            })}
                            </>
                          :
                          this.state.openAddFiche === true && this.state.updateFiche === false  ?
                          <>
                            {this.state.champs.map((elem, index) => {
                              return (
                                <li className="list-group-item">
                                  <h4 style={{fontWeight: 'bold'}}>{this.state.champs[index].nom}</h4>
                                  <h4 style={{fontWeight: 'bold'}}>{this.state.champs[index].a17}</h4>
                                  <input style={{backgroundColor: '#fff', width: 500}} id={`${this.state.champs[index].nom}`} type="text" />
                                </li>
                              )
                            })}
                            <button className="btn btn-success" style={{width: '100%'}} onClick={() => {this.addFiche()} }> Valider</button>
                          </> 
                          :
                          this.state.updateFiche === false && this.state.openAddFiche === false ?
                            this.state.champs.map((elem, index) => {
                              return this.state.detailFiche[this.state.champs[index].nom] !== '' &&                              
                              <DetailFiche data={this.state.detailFiche } champs={this.state.champs[index].nom} i={this.state.champs[index].id} />
                            })
                          :
                            this.state.champs.map((elem, index) => {
                              // console.log(this.state.selected, "ici")
                              return (
                                <li className="list-group-item">  
                                  <h4 style={{fontWeight: 'bold'}}>{this.state.champs[index].nom}</h4>
                                  <input id={`a${this.state.champs[index].id}`} className={this.state.updateOn === elem.id ? "active" : undefined} disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={this.state.detailFiche["a"+this.state.champs[index].id]}/>
                                  <a href="#" onClick={() => this.state.updateOn !== elem.id ? this.setState({updateOn: elem.id}) : this.ficheUpdate(index, this.state.selected) } >{this.state.updateOn === elem.id ?  <img  src={this.state.listIconPanela[2]} alt="Logo" /> : <img  src={this.state.listIconPanel[4]} alt="Logo" /> }</a>
                                </li>
                              // <UpdateFiche idFiche={this.state.idFiche} update={this.state.updateFiche} data={this.state.detailFiche}  champsNom={this.state.champs[index].nom} champsId={this.state.champs[index].id} />
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
