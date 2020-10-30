import React, {Component} from 'react';
import './index.css';

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
                    <div className="div-square" >
                        <img src={this.props.data.icon} alt="Logo" />
                        <h4>{this.props.data.nom}</h4>
                    </div>
                </div>
            </a>
        )
    }

}

export default Groupe