import React, {Component} from 'react';
import Groupe from '../Groupe/Groupe'
import Container from '../Container/Container';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';
import './style.css'
import logo from '../../logo.svg'

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
        console.log("REACT SELECT ALL GROUPE")
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
          // console.log('data :', data)    
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

      addGroupe(id) {
        console.log("REACT SELECT SOUS GROUPE: ", id)
        fetch('/sous-groupe', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            idGroupe: {
              groupe: id
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
          this.setState({dataGroupeIndex: data})
        })
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
              this.setState({dataGroupeIndex: data}) 
              this.setState({moveOn: ""}) 
            })
          } else {
            this.setState({moveOn: ""}) 
          }
        } else {
          console.log(" else : Move groupe on: ", this.state.moveOn,"out: ", elemId)
          this.setState({moveOn: elemId})
        }        
      }

      refreshPath(index, id){
        this.setState({selected: id})
        const array = this.state.path.filter((elem, i) => i<=index )
        this.setState({path: array})
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
        return(
          
          <div>
            {/* {console.log("delete: ", this.state.delOn)} */}
            <Navbar />
            <Navigation />
              <div id="page-wrapper">
                <div id="page-inner">
                  <div className="row text-center">
                  <h2>PANEL DE GESTION DES GROUPES</h2>
                  <div style={{marginBottom: 50}}>
                      <button className="btn btn-primary">Ajouter</button>
                      <button className="btn btn-warning">Déplacer</button>
                      <button className="btn btn-danger">Supprimer</button>
                  </div>    
                  <ul className="path" style={{borderRadius: 7, backgroundColor: '#f3f3f3' }}>
                    <li className="pathItem" onClick={() => this.setState({selected: 0, path: []})}><a href='#'><i className="fa fa-home fa-2x" aria-hidden="true"></i></a></li> 
                    {
                      this.state.path.map((elem, index) => (
                        <li className="pathItem" onClick={() => this.refreshPath(index, elem.id)}> <a href='#'>{elem.nom}</a>  </li>                          
                      ))
                    }
                  </ul>
                  <ul className="list-group list-champs">
                  <div style={{display : this.state.moveOn !== "" ? "initial" : "none"}}><a onClick={() => this.state.moveOn !== "" ? this.moveGroupe(this.state.moveOn, 0) : this.moveGroupe(this.state.moveOn, 0) } href='#'><i style={{color: "#2bb800"}} className="fa fa-home fa-2x" aria-hidden="true"></i></a></div> 
                    {
                      this.state.dataGroupeIndex.map((elem, index) => (                        
                        <li  className={`list-group-item ${elem.id_categorie !== this.state.selected && "hidden" }`} >  
                          <input ref={`nom${index}`} className={this.state.updateOn === elem.id && "active" } disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nom}/>
                          <input ref={`nomNl${index}`} className={this.state.updateOn === elem.id && "active" } disabled={this.state.updateOn === elem.id ? false : true} type="text" defaultValue={elem.nomNl}/>
                          <div>
                            <a className={this.state.updateOn === elem.id ? "green" : "white"} onClick={() => this.state.updateOn !== elem.id ? this.setState({updateOn: elem.id}) : this.updateGroupe(elem.id, index) } > <i className={`fa fa-magic fa-2x `} aria-hidden="true"></i>   </a>
                            <a className={this.state.moveOn === "" ? "white" : this.state.moveOn === elem.id ? "red" : "green"} onClick={() => this.state.moveOn !== elem.id ? this.moveGroupe(this.state.moveOn, elem.id) : this.moveGroupe(this.state.moveOn, elem.id) }> <i className="fa fa-folder fa-2x" aria-hidden="true" />  </a> 
                            <a className={this.state.delOn === elem.id ? "green" : "white"} onClick={() => this.state.delOn !== elem.id ?  this.setState({delOn: elem.id}) : this.setState({delOn: ""})}><i className={`fa fa-trash fa-2x`} aria-hidden="true" /></a>
                            <a className="white" onClick={() => this.setState((prevState => ({path: [...prevState.path, elem], selected: elem.id}))) } > <i className={`fa fa-arrow-down fa-2x`} aria-hidden="true" />   </a>
                            <input type="checkbox" onChange={(e) => this.checked({id: elem.id, checked: e.target.checked}) } />
                          </div>
                          <div style={{display: this.state.delOn === elem.id ? "initial" :  "none"}}>
                            <p>Êtes vous sur?</p>
                            <button onClick={() => this.delGroupe(elem.id, index) } className="btn btn-success">Oui</button>
                            <button onClick={() => this.setState({delOn: ""})} className="btn btn-danger">Non</button>
                          </div>
                        </li>
                      ))
                    }
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



{/* <div className={this.state.moveOn === elem.id ? "moveOn" :"moveOff" }>
                            <select onChange={(e) => this.setState({moveId: e.target.options[e.target.selectedIndex].value})}>
                              {
                                this.state.dataGroupeIndex.map((eleme, index) => (
                                  <option>{eleme.id}</option>
                                  ))
                              }
                            </select>
                            <button  onClick={() => this.setState({moveOn: ""}) }  className="btn btn-danger">Annuler</button>
                          </div> */}