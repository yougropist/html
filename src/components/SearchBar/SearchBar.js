import React, {Component} from 'react'
import './index.scss'
import search from '../../assets/img/search.svg'

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
        console.log('correct: ', res.status)
        return res.json()
      } 
      else {
        console.log('error: ', res.status)
        return null
      }
    })
    .then(data => {    
      console.log(data, 88)
      this.setState({fiches: data})
    })
  }

  urlUpdate(id) {
    console.log(id)
    fetch('/idGroupe', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        id: id
      }),
    })
    .then((res) => {
      if (res.status === 200) {
        console.log('correct: ',res.status)
        return res.json()
      } 
      else {
        console.log('error: ',res.status)
        return null
      }
    })
    .then(data => {
      window.location.href = `/sous-groupe/${data[0].idFiche}`
      
    })
  }

  render() {
    console.log(this.state.fiches, 77)
    return(
      <div className="search">
        <img src={search} />
        <input onBlur={() => this.setState({display: false})} onFocus={() => this.setState({display: true})} type="search" onChange={e => this.setState({search: e.target.value})} />
        <ul style={{opacity: this.state.display ? '1' : '0'}}>
          {/* {this.state.fiches.filter(el => el.Nom.toLowerCase().includes(this.state.search.toLowerCase())).map(elem => (
            <li onClick={() => this.urlUpdate(elem.id)}>
              {elem.Nom}
            </li>
          ))} */}
        </ul>
      </div>
    )
  }
}

export default SearchBar