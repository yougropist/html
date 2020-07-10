import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Footer from '../Footer/Footer';
import {withRouter} from "react-router"

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      dataGroupeIndex: [],
      sousGroupe: []
    }
    
  }

  componentDidMount() {
    // console.log("démarage de la fonction serveur")
    fetch('/intro', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        data:"ok"
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
      // console.log('data :', data)    
    })

    if (this.props.match.params) {
      fetch('/sous-groupe', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          idGroupe:this.props.match.params
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
        this.setState({sousGroupe: data}) 
      })
    }
   
    
  }

  
  
  handleClick(){
    this.setState({username: this.state.value})
  }

  render(){
    console.log("DATAAA : ", this.props.dataGroupeIndex)
    console.log(this.props.match.params.groupe,12)
    return (
      <div className="App">
        <Wrapper dataGroupeIndex={this.state.sousGroupe.length > 0 ? this.state.sousGroupe : this.state.dataGroupeIndex} />           
        <Footer />
      </div>
    );
  }
  
}

export default withRouter(Home);


