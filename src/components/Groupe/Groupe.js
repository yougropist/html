import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css'
import { render } from '@testing-library/react';

class Groupe extends Component  {

    constructor(props){
        super(props);
        this.state = {
            data: [],
          value: []
        }
        
    }

    addGroupe(){
        if(this.refs.sousGroupe.style.visibility != "visible"){            
            this.refs.sousGroupe.style.visibility = "visible"
            this.refs.sousGroupe.style.position = "relative"
            this.refs.addBtn.className = "fa fa-minus-square"
            this.refs.addBtn.style.backgroundColor = "green"
            this.props.addGroupe(this.props.data.id)
        } else {
            this.refs.sousGroupe.style.visibility = "hidden"
            this.refs.sousGroupe.style.position = "absolute"       
            this.refs.addBtn.style.backgroundColor = "#0c1326"    
            this.refs.addBtn.className = "fa fa-plus-square" 
        }
    }

    updateGroupe() {
        if(this.refs.nom.disabled != false){
            console.log("update: ", this.props.data.id);
            this.refs.nom.disabled = false;
            this.refs.nomNl.disabled = false;
            this.refs.updateChecked.style.backgroundColor = "green"
            this.refs.nom.style.backgroundColor = "#fff"
            this.refs.nomNl.style.backgroundColor = "#fff"
            this.refs.updateChecked.className = "fa fa-check-square-o"            
        } else {
            console.log("update check: ", this.props.data.id);
            console.log("new Value: ", this.refs.nom.value);
            this.refs.nom.disabled = true;
            this.refs.nomNl.disabled = true;
            this.refs.updateChecked.style.backgroundColor = "#0c1326"
            this.refs.nom.style.backgroundColor = "transparent"
            this.refs.nomNl.style.backgroundColor = "transparent"
            this.refs.updateChecked.className = "fa fa-pencil-square-o"
            this.props.updateGroupe(this.props.data.id, this.refs.nom.value, this.refs.nomNl.value)
        }
        
    }

    render(){
        // console.log("VALUE TAB : ",this.state.value)
        if(this.props.admin == true){
            return(
                <div>
                    <div className="panelGroupe">
                        <div className="div-square2">
                            <div className="col-xs-8" id="nomGroupe">
                                <i className="fa fa-comments-o fa-3x" aria-hidden="true" />                                      
                                <input disabled ref="nom" type="text" defaultValue={this.props.data.nom}/>
                                <input disabled ref="nomNl" type="text" defaultValue={this.props.data.nomNl}/>
                            </div>
                            <div className="col-xs-4">
                                <i ref="updateChecked" id="styleIcon" onClick={() => {this.updateGroupe()} } className="fa fa-pencil-square-o " aria-hidden="true"></i>
                                <i id="styleIcon" onClick={() => {this.props.moveGroupe(this.props.data.id)} } className="fa fa-folder-o " aria-hidden="true"></i>
                                <i id="styleIcon" onClick={() => {this.props.delGroupe(this.props.data.id)} } className="fa fa-trash-o " aria-hidden="true" />
                                <i ref="addBtn" id="styleIcon" onClick={() => {this.addGroupe()} } className="fa fa-plus-square " aria-hidden="true" />
                                <input type="checkbox" onChange={(e) => this.props.checked({id: this.props.data.id, checked: e.target.checked}) } />
                            </div>                       
                        </div>
                        <div ref="sousGroupe" id="sousGroupe" className="div-square3">
                            <ul>
                                
                                <li > <input type="text" placeholder="nom FR" /> <input type="text" placeholder="nom NL" />  <i id="styleIcon"  onClick={(id) => {this.props.addGroupe(id)} } className="fa fa-plus-square " aria-hidden="true" /> </li>
                             
                                {
                                this.props.sousGroupe.map((elem, index) => (
                                <li className="div-square4">{elem.nom}</li>
                                ))
                            }     
                            </ul>  
                                 
                        </div>
                    </div>
                </div>
                
            ) 
        } else {
            return(
                <div className="col-xs-12 col-md-6 col-lg-3">
                    <div className="div-square">
                        <a href={`/sous-groupe/${this.props.data.id}`}>
                            <i className="fa fa-comments-o fa-3x"></i>
                            <h4>{this.props.data.nom}</h4>
                            {/* {this.props.results.map(({data, links, href}) => <Result data={data} links={links} href={href} />)} */}
                        </a>
                    </div>
                </div>
            ) 
        }
    }
    
       
}

export default Groupe