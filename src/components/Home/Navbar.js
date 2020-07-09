import React from 'react';
import img from '../../assets/img/header.PNG';

function Navbar() {
    return(
        <div className="navbar navbar-inverse">     
            <div className="adjust-nav">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div> 
            </div>
            <img id="headerr" src={img} />
        </div>
    )
}

export default Navbar