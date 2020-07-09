import React, {Component} from 'react';
import logo from './assets/img/logo.png';
import Wrapper from './components/Wrapper';
import Script from './components/Script';
import Head from './components/Head';
import Footer from './components/Footer';
import './App.css';
import './assets/css/bootstrap.css';
import './assets/css/custom.css';
import './assets/css/font-awesome.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {  
      dataGroupeIndex: [],
      username: "",
      resData: {
        id: 0,
        user: "",
        pass: "",
        visit: 0
      }
      
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
    
  }

  handleChange(e){
    this.setState({value: e.target.value})
  }
  
  handleClick(){
    this.setState({username: this.state.value})
  }

  render(){
    
    return (
      <div className="App">
        {/* <input value={this.state.value} onChange={this.handleChange.bind(this)}></input><br />
       <button onClick={() => }>START</button> */}
        <Head />
        <Wrapper dataGroupeIndex={this.state.dataGroupeIndex} />
        <Footer />
        <Script />
      </div>
    );
  }
  
}

export default App;

