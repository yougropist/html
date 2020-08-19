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
      path: this.props.match.params.page
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
        console.log('correct: ',res.status)
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
    console.log(this.props.match.params, 'ici')
    this.urlUpdate()
    
    return (
      <>
            <Navbar />
            <Navigation />
            <div id='page-wrapper'>
                <div id='page-inner'>

                <ul className="posts">
                  {this.state.posts.map(elem => (
                    <li>
                      <h2>{elem.titre}</h2>
                      {elem.image.length > 0 && <div><img src={elem.image} /></div>}
                      <p>{elem.descriptio}</p>
                      {elem.url.length > 0 && <a href={elem.url} target="_blank">Plus d'informations</a>}
                    </li>
                  ))}
                </ul>

                <ul className="groupes">
                  {this.state.groupes.map(elem => (
                    <li onClick={() => window.location.pathname = `/sous-groupe/${elem.id}`}>
                      <i className={`${elem.icon} fa-2x`}></i>
                      <p>{elem.nom}</p>
                    </li>
                  ))}
                </ul>
            
                </div>
            </div>
            
            <Footer />
            </>
    )
  }
}

export default withRouter(Page)