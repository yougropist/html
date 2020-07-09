import React from 'react';
import Groupe from './Index/Groupe'

function Container(props) {
    // console.log("--------------",props.dataGroupeIndex[0])
    
    return(
        <div id="page-wrapper" >
            <div id="page-inner">
                <div className="row">
                    <div className="col-lg-12">
                        {/* <h1>{this.props.name} </h1> */}
                        <h2>Répertoire santé mentale bruxellois</h2>   
                    </div>
                </div>    
                <div className="row">
                    <div className="col-lg-12 ">
                        <div className="alert alert-info">
                            Ce répertoire, est destiné à toute personne, usagers, proches et professionnels à la recherche de coordonnées de services en santé mentale en Région de Bruxelles-Capitale.
                            Il est développé et mis à jour par www.pfcsm-opgg.be la Plate-forme de Concertation pour la Santé Mentale de Bruxelles.                            
                            Si vous souhaitez nous faire part d’une remarque, d’un oubli de notre part, ou d’une erreur d’encodage, n’hésitez pas à nous contacter via l’adresse mail suivante : info@pfcsm-opgg.be
                        </div>
                    </div>
                </div>
                <div className="row text-center pad-top">
                    {
                        props.dataGroupeIndex.map((elem, index) => (
                            <Groupe data={props.dataGroupeIndex[index]} />
                        ))
                    }
                </div>  
            </div> 
        </div>
    ) 
}


export default Container