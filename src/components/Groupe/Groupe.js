import React, {Component} from 'react';

function Groupe(props)  {
    console.log(props.data.nom,15)
    return(
        <div className="col-xs-12 col-md-6 col-lg-3">
            <div className="div-square">
                <a href={`/sous-groupe/${props.data.id}`}>
                    <i className="fa fa-comments-o fa-3x"></i>
                    <h4>{props.data.nom}</h4>
                    {/* {this.props.results.map(({data, links, href}) => <Result data={data} links={links} href={href} />)} */}
                </a>
            </div>
        </div>
    )    
}

export default Groupe