import React, {Component} from 'react'
import './index.scss'
import {withRouter} from 'react-router'
import Navbar from '../Navbar/Navbar'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'


class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      groupes: [],
      path: this.props.match.params.page,
      langue: 'fr',
    }
  }

  componentDidMount() {
    fetch('/post', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        id: this.props.match.params.page
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
      this.setState({posts: data.posts,groupes: data.groupes}) 
    })
  }

  urlUpdate() {
    if(this.state.path !== this.props.match.params.page) {
      this.setState({
        path: this.props.match.params.page
      }, () => this.componentDidMount())
    }
  }

  render() {
    console.log(this.state.posts, 'ici')
    this.urlUpdate()
    
    return (
      <>
            <Navbar />
            <Navigation />
            <div id='page-wrapper'>
              <button className="btn btn-primary" onClick={() => { this.setState({langue: 'fr'}) }}>FR</button>
              <button className="btn btn-primary" onClick={() => { this.setState({langue: 'nl'}) }}>NL</button>
                <div id='page-inner'>
                <ul className="posts">
                  { 
                  this.state.langue === 'fr' ?
                  this.state.posts.map(elem => (
                    <li style={{display: elem.titre === '' ? 'none' : 'block' }}>
                      <h2>{elem.titre}</h2>
                      {elem.image.length > 0 && <div><img src={elem.image} /></div>}
                      <p>{elem.descriptio}</p>
                      {elem.url.length > 0 && <a href={elem.url} target="_blank">Plus d'informations</a>}
                    </li>
                  ))
                  :
                  this.state.posts.map(elem => (
                    <li style={{display: elem.titreNL === '' ? 'none' : 'block' }}>
                      <h2>{elem.titreNL}</h2>
                      {elem.image.length > 0 && <div><img src={elem.image} /></div>}
                      <p>{elem.descriptioNL}</p>
                      {elem.url.length > 0 && <a href={elem.url} target="_blank">Meer informatie</a>}
                    </li>
                  ))
                  }
                </ul>
                <ul className="groupes">
                { 
                  this.state.langue === 'fr' ?
                  this.state.groupes.map(elem => (
                    <li onClick={() => window.location.pathname = `/sous-groupe/${elem.id}`}>
                      <i className={`${elem.icon} fa-2x`}></i>
                      <p>{elem.nom}</p>
                    </li>
                  ))
                  :
                  this.state.groupes.map(elem => (
                    <li onClick={() => window.location.pathname = `/sous-groupe/${elem.id}`}>
                      <i className={`${elem.icon} fa-2x`}></i>
                      <p>{elem.nomNl}</p>
                    </li>
                  ))
                  }
                </ul>            
                </div>
            </div>
            
            <Footer />
            </>
    )
  }
}

export default withRouter(Page)