import React from 'react';
import Navbar from './Navbar';
import Navigation from './Navigation';
import Container from './Container';

function Wrapper(props) {
    // console.log("------------------------",props.dataGroupeIndex)
    return(
        <div id="wrapper">
            <Navbar />
            <Navigation />
            <Container dataGroupeIndex={props.dataGroupeIndex} />
            
        </div>

    ) 
}

export default Wrapper