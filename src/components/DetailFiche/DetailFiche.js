import React from 'react';
import './index.css'

function DetailFiche(props){
    var index = "a"+props.i
    // console.log("champs: ", props.champs, "/value: ", props.data[index], "/ID: ", index, 6565)
    return(
        <>
        {props.data[index] !== '' &&
            <li className="list-group-item">
                <h4 style={{fontWeight: 'bold', textAlign: 'left', width:140}}>{props.champs}</h4>
                <h4 style={{textAlign: 'right', width:500}}> {props.data[index]} </h4>
            </li>
        }
        </>
    )
}

export default DetailFiche
