import React, {Component} from 'react';
import './index.css'

class Groupe extends Component  {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            value: [],
            openGroupe: "",
        }        
    }

    


    render(){
        // console.log("Panel render Groupe : ",this.props.fiches)
            return(
                <a href={`/sous-groupe/${this.props.data.id}`}>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="div-square">
                            <i style={{color: '#f3ca12'}} className={this.props.data.icon+ ` fa-2x`}></i>
                            <h4>{this.props.data.nom}</h4>
                        </div>
                    </div>
                </a>
            ) 
        
    }
    
       
}

export default Groupe



{/* <i className="fa fa-comments-o fa-3x" aria-hidden="true" />                                      
                        
                        <ul ref="sousGroupe" class="closeSousGroupe" >
                        {
                            this.props.sousGroupe.map((elem, index) => (
                                <li id="listeSousGroupe"> 
                                    <input disabled type="text" defaultValue={elem.nom}/>
                                    <input disabled type="text" defaultValue={elem.nomNl}/>
                                    <i id="styleIcon" className="fa fa-pencil-square-o " aria-hidden="true"></i>
                                    <i id="styleIcon" className="fa fa-folder-o " aria-hidden="true"></i>
                                    <i id="styleIcon" className="fa fa-trash-o " aria-hidden="true" />
                                    <i id="styleIcon" className={`fa fa-arrow-down`} aria-hidden="true" />
                                    <input type="checkbox" />
                                </li>
                            )) 
                        }     
                        </ul>  
                        <div ref="confirmDelGroupe" class="closeSousGroupe" >
                            <p>Etes vous sur de vouloir le supprimer ?</p>    
                            <button onClick={() => {this.props.delGroupe(this.props.data.id)}} class="btn btn-primary">Oui</button>
                            <button onClick={() => {this.confirmDeleteGroupe()}} class="btn btn-danger">Non</button>
                        </div>  */}