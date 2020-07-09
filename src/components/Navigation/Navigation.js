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
                        <a href="ui.html"><i className="fa fa-table"></i>Profil</a>
                    </li>
                    <li>
                        <Link to="/champs"><i className="fa fa-desktop"></i>Gestions des champs</Link> 
                    </li>
                    <li>
                        <Link to="/groupes"><i className="fa fa-bar-chart-o"></i>Gestions des groupes</Link>
                    </li>
                    <li>
                        <a href="poste.html"><i className="fa fa-bar-chart-o"></i>Gestion des poste</a>
                    </li>
                    <li>
                        <a href="fiche.html"><i className="fa fa-bar-chart-o"></i>Gestion des fiches</a>
                    </li>
                    <li>
                        <a href="page.html"><i className="fa fa-edit "></i>Ajouter une page</a>
                    </li>
                    <li>
                        <a href="addGroupe.html"><i className="fa fa-table "></i>Ajouter un groupes</a>
                    </li>                    
                    <li>
                        <a href="addPoste.html"><i className="fa fa-edit "></i>Ajouter un poste</a>
                    </li>
                    <li>
                        <a href="addFiche.html"><i className="fa fa-edit "></i>Ajouter une fiche</a>
                    </li>                    
                </ul>
            </div>
        </nav> 
    ) 
}

export default Navigation