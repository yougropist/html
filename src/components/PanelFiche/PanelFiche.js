import React, {Component} from 'react';
import './style.css';

function viewFiche(props) {
  return(
    this.state.champs.map((elem, index) => {
      return this.state.detailFiche[this.state.champs[index].nom] !== '' &&
      <DetailFiche data={this.state.detailFiche} champs={this.state.champs[index].nom} />
    })
  )
}

function updateFiche(props){
  this.state.champs.map((elem, index) => {
    return (<UpdateFiche data={this.state.detailFiche} champs={this.state.champs[index].nom} />)
  })
}


function panelFiche(props)  {


        return(          
          this.state.nomFiche.map((elem, index) => {
            return(
              <li className="list-group-item" >  
                <p style={{textAlign: 'left', width:300}}>{elem.Nom}</p>
                <p style={{textAlign: 'left', width:100}}>{elem['Code postal']}</p>
                <div>
                  <a className={this.state.updateOn === elem.id ? "green" : "white"} onClick={() => this.updateFiche()} > <i className={`fa fa-magic fa-2x `} aria-hidden="true"></i>   </a>
                  <a className={this.state.moveOn === "" ? "white" : this.state.moveOn === elem.id ? "red" : "green"} onClick={() => console.log("move fiche") }> <i className="fa fa-folder fa-2x" aria-hidden="true" />  </a> 
                  <a className={this.state.delOn === elem.id ? "green" : "white"} onClick={() => console.log("delete fiche")}><i className={`fa fa-trash fa-2x`} aria-hidden="true" /></a>
                  <a className="white" onClick={() => this.ficheDetail(elem.id) } > <i className={`fa fa-arrow-down fa-2x`} aria-hidden="true" />   </a>
                  <input type="checkbox" onChange={() =>  console.log("check fiche")} />
                </div>
              </li>
            )
          })
          
        )    
    
   
}

export default PanelFiche
