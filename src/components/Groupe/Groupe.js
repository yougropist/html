import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css'

function Groupe(props)  {

    
    
    function delGroupe() {
        console.log("delete: ", props.data.id)
    }

    function updateGroupe() {
        console.log("update: ", props.data.id)
    }

    function moveGroupe() {
        console.log("move: ", props.data.id)
    }

    if(props.admin == true){
        
        return(
            <div>
                <div className="panelGroupe">
                    <div className="col-xs-12">
                        <div className="div-square2">
                            <i className="fa fa-comments-o fa-2x" aria-hidden="true" />                            
                            <i id="styleIcon" onClick={() => {updateGroupe()} } className="fa fa-pencil-square-o " aria-hidden="true"></i>
                            <i id="styleIcon" onClick={() => {moveGroupe()} } className="fa fa-folder-o " aria-hidden="true"></i>
                            <i id="styleIcon" onClick={() => {delGroupe()} } className="fa fa-trash-o " aria-hidden="true" />
                            <input type="checkbox" onChange={(e) => { this.setState({value: e.target.value}) }} />
                            <h4>{props.data.nom}</h4>
                            {/* {this.props.results.map(({data, links, href}) => <Result data={data} links={links} href={href} />)} */}
                        </div>
                    </div>
                </div>
            </div>
            
        ) 
    } else {
        return(
            <div className="col-xs-12 col-md-6 col-lg-3">
                <div className="div-square">
                    <a href="blank.html/">
                        <i className="fa fa-comments-o fa-3x"></i>
                        <h4>{props.data.nom}</h4>
                        {/* {this.props.results.map(({data, links, href}) => <Result data={data} links={links} href={href} />)} */}
                    </a>
                </div>
            </div>
        ) 
    }
       
}

export default Groupe