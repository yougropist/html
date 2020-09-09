import React, { Component } from 'react';
import './index.css'

class AddFiche extends Component{

    constructor(props) {
        super(props);
        this.state = {
            updateOn: ''
        }
      }

      ficheUpdate(id) {
        console.log("REACT UPDATE FICHE: ", id, this.refs[`champ${this.props.champs}`].value, this.props.champs)
        this.setState({updateOn: ""})
        fetch('/refreshFiches', {
          method: 'PUT',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            id: id,
            champs:this.props.champs,
            value:this.refs[`champ${this.props.champs}`].value
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
        })
      }

      render(){
        
        return(       
            <li class="list-group-item">  
                <h4 style={{fontWeight: 'bold'}}>{this.props.champs}</h4>
                <a href="#" className={this.state.updateOn === this.props.data['id'] ? "green" : "white"} onClick={() => this.state.updateOn !== this.props.data['id'] ? this.setState({updateOn: this.props.data['id']}) : this.ficheUpdate(this.props.data['id']) } ><i className={`fa fa-magic fa-2x`} aria-hidden="true"></i></a>
                <input ref={`champ${this.props.champs}`} className={this.state.updateOn === this.props.data['id'] && "active" } disabled={this.state.updateOn === this.props.data['id'] ? false : true} type="text" />
            </li>
        ) 
      }
           
       
}

export default AddFiche
