import React from 'react';
import './index.css'

function DetailFiche(props){

        return(    
               
            <li class="list-group-item">                 
            {props.data[props.champs] !== '' &&
            <>
            <h4 style={{fontWeight: 'bold', textAlign: 'left', width:140}}>{props.champs}</h4>
            <h4 style={{textAlign: 'right', width:500}}>{props.data[props.champs]}</h4>
            </>
            }    
            </li>               
        )       
}

export default DetailFiche
