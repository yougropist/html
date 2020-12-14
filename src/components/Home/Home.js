import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import Container from '../Container/Container';
import {withRouter} from "react-router"

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      dataGroupeIndex: [],
      sousGroupe: [],
      fiches: [],
      objEmpty: {}
    }
  }

  componentDidMount() {
    // console.log(this.props)
    fetch('/intro', {method: 'POST'})
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
      // console.log('data :', data, 89898989)
      this.setState({dataGroupeIndex: data})      
    })
    // console.log(this.props.match.params, 565656)
    if (this.props.match.params) {
      // console.log(this.props.match.params," aaaa")
      fetch('/sous-groupe', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          idGroupe: this.props.match.params
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
        // console.log('data :', data, 5555)   
        if(data.fiches !== undefined) {this.setState({sousGroupe: [], fiches: data.fiches})} 
        else {this.setState({dataGroupeIndex: data, fiches: []})}
      }) 
    } 
  }

  componentDidUpdate(prevProps, prevState){
    // console.log(this.props.match.url, 656565656)
    if(this.props.match.url === '/' && prevProps.match.url !== this.props.match.url){
      this.setState({fiches: []})
      fetch('/intro', {method: 'POST'})
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
        // console.log('data :', data, 89898989)
        this.setState({dataGroupeIndex: data})      
      })
    } else {
      if (this.props.match.params.groupe && prevProps.match.params.groupe !== this.props.match.params.groupe) {
        // console.log(this.props.match.params.groupe," aaaa")
        fetch('/sous-groupe', {
          method: 'POST',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            idGroupe: this.props.match.params
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
          // console.log('data :', data, 5555)   
          if(data.fiches !== undefined) {this.setState({sousGroupe: [], fiches: data.fiches})} 
          else {this.setState({dataGroupeIndex: data, fiches: []})}
        }) 
      }
    }    
  }
  
  handleClick(){
    this.setState({username: this.state.value})
  }

  render(){
    // console.log("REACT RENDER : ", window.redirect)
    // console.log(this.state, 12)
    return (
      <div className="App">      
          <Navbar />
          <Navigation />
          <Container fiches={this.state.fiches} idGroupe={this.props.match.params.groupe} dataGroupeIndex={this.state.dataGroupeIndex} />
          <Footer />
      </div>
    );
  }
  
}

export default withRouter(Home);


