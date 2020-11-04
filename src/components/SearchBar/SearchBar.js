import React, {Component} from 'react';
import './index.scss';
import search from '../../assets/img/search.svg';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fiches: [],
      search: '',
      display: false
    }
  }

  componentDidMount() {
    fetch('/fiches')
    .then((res) => {
      if (res.status === 200) {
        // console.log('correct: ', res.status)
        return res.json()
      } 
      else {
        console.log('error: ', res.status)
        return null
      }
    })
    .then(data => {    
      // console.log(data, 88)
      this.setState({fiches: data})
    })
  }



  
  searchFiches(value){
    if(value !== ""){
      this.setState({display: true})
    } else {
      this.setState({display: false})
    }
    fetch('/searchFiches', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        value: value
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
      // console.log("data :", data)
      this.setState({fiches: data})
    })
    
  }

  render() {
    // console.log(this.state.fiches, 77)
    return(
      <div className="search">
        <img src={search} />
        <input type="search" onChange={e => this.searchFiches(e.target.value)} />
        <ul style={{opacity: this.state.display ? '1' : '0'}}>
          {this.state.display &&
            this.state.fiches.map((elem, index) => {
              return(
                <Link to={`fiche/${elem.id}`} >
                  {elem.a0}
                </Link>
              )             
            }) 
          }
        </ul>
      </div>
    )
  }
}

export default SearchBar