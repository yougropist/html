import React, {Component} from 'react';
import './index.css'

class Fiche extends Component  {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            value: [],
            openGroupe: "",
            detail: '',
        }        
    }

    render(){
        // console.log("Panel render Groupe : ", this.props)
        return(                
            <li className="list-group-item">
                <h4>{this.props.data["a0"]}</h4>
                <button onClick={() => this.props.ficheDetail(this.props.data.id)} className="btn btn-success">Détail</button>
            </li> 
        )
    }
}

export default Fiche
