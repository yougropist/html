import React from 'react';
import {Link} from 'react-router-dom';

function Navigation() {
    return(
        <nav className="navbar-default navbar-side" role="navigation" >
            <div className="sidebar-collapse">
                <ul className="nav" id="main-menu">
                    <li className="active-link">
                        <Link to="/"><i className="fa fa-desktop"></i>Accueil</Link> 
                    </li>
                    <li>
                        <Link to="/profil"><i className="fa fa-table"></i>Profil</Link>
                    </li>
                    <li>
                        <Link to="/champs"><i className="fa fa-desktop"></i>Gestions des champs</Link> 
                    </li>
                    <li>
                        <Link to="/panelGroupes"><i className="fa fa-bar-chart-o"></i>Gestions des groupes</Link>
                    </li>
                    <li>
                        <Link to="/postes"><i className="fa fa-bar-chart-o"></i>Gestions des poste</Link>
                    </li>
                    <li>
                        <Link to="/fiches"><i className="fa fa-bar-chart-o"></i>Gestions des fiches</Link>
                    </li>
                                   
                </ul>
            </div>
        </nav> 
    ) 
}

export default Navigation