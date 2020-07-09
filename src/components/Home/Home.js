import React, {Component} from 'react';
import Wrapper from '../Wrapper/Wrapper';
import Footer from '../Footer/Footer';


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
    console.log("testing")
    return (
      <div className="App">
        {/* <input value={this.state.value} onChange={this.handleChange.bind(this)}></input><br />
       <button onClick={() => }>START</button> */}
        <Wrapper dataGroupeIndex={this.state.dataGroupeIndex} />
           
        <Footer />
      </div>
    );
  }
  
}

export default Home;


