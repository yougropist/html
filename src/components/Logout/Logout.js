import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

class Logout extends Component  {

    constructor(props){
        super(props);
        this.state = {
        }
      }    

    componentDidMount() {
      console.log("REACT LOGOUT ADMIN: ", window.redirect)           
          window.redirect = false 
    }

    render(){
        return(            
              <Redirect to="/" />  
        )    
    }
   
}

export default Logout