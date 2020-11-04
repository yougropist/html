import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pages: []
        }
    }

    componentDidMount() {
        fetch('/pages')
          .then((res) => {
            if (res.status === 200) {
              return res.json()
            } 
            else {
              console.log('error: ', res.status)
              return null
            }
          })
          .then(data => { 
            // console.log(data, "id/ 78")       
            this.setState({pages: data}) 
          })
    }

    render() {
        // console.log(window.redirect, 5656)
        const adminNav = [
            {text: 'Profil', link: '/profil'},
            {text: 'Gestions des champs', link: '/champs'},
            {text: 'Gestions des groupes', link: '/panelGroupes'},
            {text: 'Gestions des pages', link: '/pages'},
            {text: 'Deconnexion', link: '/logout'}
        ]

        return(
            <nav className="navbar-default navbar-side" role="navigation" >
                <div className="sidebar-collapse">
                    {window.redirect === true ? 
                    <div>
                        <ul className="nav" id="main-menu" style={{backgroundColor: 'rgb(15, 15, 70)'}}>
                            {adminNav.map(elem => (
                                <li style={{backgroundColor: window.location.pathname === elem.link && 'rgb(50, 50, 130)'}}>
                                    <Link style={{color: 'rgb(150, 150, 245)'}} to={elem.link}> {elem.text}</Link>
                                </li>
                            ))}
                        </ul>  
                        <ul className="nav" style={{paddingTop: '0'}}>
                                <li className={window.location.pathname === '/' ? 'active-link' : undefined}>
                                    <Link to="/"> Accueil</Link> 
                                </li>
                            {
                            this.state.pages.map(elem => (
                                <li className={this.props.match.params.page === elem.id ? 'active-link' : undefined}>
                                    <Link to={`/page/${elem.id}`}>{elem.nom}</Link>
                                </li>
                            ))
                            }
                        </ul> 
                    </div>                    
                    :
                    <div>
                        <ul className="nav" style={{paddingTop: '-50px'}}>
                            <li className={window.location.pathname === '/' ? 'active-link' : undefined}>
                                <Link to="/"> Accueil</Link> 
                            </li>
                            {
                            this.state.pages.map(elem => (
                                <li className={this.props.match.params.page === elem.id ? 'active-link' : undefined}>
                                    <Link to={`/page/${elem.id}`}>{elem.nom}</Link>
                                </li>
                            ))
                            }
                        </ul>           
                    </div>
                    
                    }
                     
                    
                </div>
            </nav> 
        ) 
    }
}

export default withRouter(Navigation)