import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css'
import { render } from '@testing-library/react';

class Groupe extends Component  {

    constructor(props){
        super(props);
        this.state = {
          value: []
        }
        
    }
    
    delGroupe() {
        console.log("delete: ", this.props.data.id)
    }

    updateGroupe() {
        console.log("update: ", this.props.data.id)
    }

    moveGroupe() {
        console.log("move: ", this.props.data.id)
    }

    handleChange(e){
        // console.log('aa', e.target.checked)
        if(e.target.checked){
            // console.log('la', e.target.value)
            const array = []
            array.push(this.props.data.id)
            this.setState(prevState => ({value: [...prevState.value, array[0]]}))
        } else {
            console.log('ici', e.target.value)            
        }                
    }

    render(){
        console.log("VALUE TAB : ",this.state.value)
        if(this.props.admin == true){
            return(
                <div>
                    <div className="panelGroupe">
                        <div className="col-xs-12">
                            <div className="div-square2">
                                <i className="fa fa-comments-o fa-2x" aria-hidden="true" />                            
                                <i id="styleIcon" onClick={() => {this.updateGroupe()} } className="fa fa-pencil-square-o " aria-hidden="true"></i>
                                <i id="styleIcon" onClick={() => {this.moveGroupe()} } className="fa fa-folder-o " aria-hidden="true"></i>
                                <i id="styleIcon" onClick={() => {this.delGroupe()} } className="fa fa-trash-o " aria-hidden="true" />
                                <input type="checkbox" onClick={(e) => this.handleChange(e) } />
                                <h4>{this.props.data.nom}</h4>
                            </div>
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