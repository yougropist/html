import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import "./index.scss"

class Champs extends Component  {
    constructor(props){
        super(props)
        this.state = {
            champs: [],
            update: ''
        } 
    
    }
    componentDidMount(){
        fetch('/champs')
          .then((res) => {
            if (res.status === 200) {
              // console.log('correct: ',res.status)
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            console.log('data :', data) 
          
            this.setState({champs: data}) 
          })

         console.log(this.refs.nom)
    }


update(id,index){
    console.log(id,index,this.refs[`nom${index}`].value,this.refs[`nomNl${index}`].value)

    this.setState({update:''})

    fetch('/champs/update', {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id:id,
          nom:this.refs[`nom${index}`].value,
          nomNl:this.refs[`nomNl${index}`].value
        }),
      })
          .then((res) => {
            if (res.status === 200) {
              // console.log('correct: ',res.status)
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            console.log('data :', data) 
          
            // this.setState({champs: data}) 
          })

}
    add(){
        fetch('/champs/add', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
              
              fr:this.refs.fr.value,
              nl:this.refs.nl.value
            }),
          })
              .then((res) => {
                if (res.status === 200) {
                  // console.log('correct: ',res.status)
                  return res.json()
                } 
                else {
                  console.log('error: ',res.status)
                  return null
                }
              })
              .then(data => {
                console.log('data :', data) 
              
                this.setState({champs: data}) 
              })

              this.refs.info.style.animation = 'open 5000ms ease-in-out forwards'

              this.refs.info.onanimationend = () => {
                this.refs.info.style.animation = ''

              }

    }


    render(){
        return(
            <div >
               
                <Navbar />
                <Navigation />
                <div id='page-wrapper'>
                    <div id='page-inner'>
                        <div className='container-ajout'>
                        <input placeholder='Nom FR' type='text' ref='fr' />
                        <input placeholder='Nom NL' type='text' ref='nl' />
                             <button onClick={() => this.add()}>Ajouter champs</button>
                        </div>
                        <div ref='info' className='info'>
                            Les données ont bien été ajoutées
                        </div>
                       
                    <ul className="list-group list-champs">
                    {this.state.champs.map((elem,index) => (
                        <li key={index} class="list-group-item">
                            {/* <input type='text'>{elem.nom}</input> */}
                            <input className={index===this.state.update? 'active':''} ref={`nom${index}`} defaultValue={elem.nom} type='text' disabled={index===this.state.update? false:true}/>
                            <input className={index===this.state.update? 'active':''} ref={`nomNl${index}`} defaultValue={elem.nomNl} type='text'disabled={index===this.state.update? false:true}/>
                            {index === this.state.update ? 
                                <button onClick={() => this.update(elem.id, index)} className='valider'>Valider</button>
                        :<button onClick={() => this.setState({update:index})}>Modifier</button>}
                            
                            </li>
                    ))}
                </ul>
                    </div>
                </div>
                
                <Footer />
               
                
            </div>
        )   
    }
    
}

export default Champs