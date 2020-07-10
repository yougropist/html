import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Footer from '../Footer/Footer';
import {withRouter} from "react-router"

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      dataGroupeIndex: [],
      username: "",
      resData: {
        id: 0,
        user: "",
        pass: "",
        visit: 0,
      },
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
        value:this.state.value,
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
        console.log('data :', data)   
        this.setState({sousGroupe: data}) 
      })
    }
   
    
  }

  handleChange(e){
    this.setState({value: e.target.value})
  }
  
  handleClick(){
    this.setState({username: this.state.value})
  }

  render(){
    console.log(this.props.match.params.groupe,12)
    return (
      <div className="App">
        {/* <input value={this.state.value} onChange={this.handleChange.bind(this)}></input><br />
       <button onClick={() => }>START</button> */}
        <Wrapper dataGroupeIndex={this.state.sousGroupe.length > 0 ? this.state.sousGroupe : this.state.dataGroupeIndex} />

           
        <Footer />
      </div>
    );
  }
  
}

export default withRouter(Home);


