import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import "./index.scss"
import e from 'cors';


class Pages extends Component  {
    constructor(props){
        super(props)
        this.state = {
            pages: [],
            post: [],
            groupes:[],
            groupesPost: [],
            groupePage: [],
            groupeSelected: {id:'',nom:''},
            switch: false,
            newPost: {
                titre: '',
                titreNl: '',
                url: '',
                image: '',
                description: '',
                descriptionNl: '',
                
            }
          
            
        } 
    
    }
    componentDidMount(){
        fetch('/pages')
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
          
            this.setState({pages: data}) 
            this.getPost(this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id)

          })

          fetch('/groupes')
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
          
            this.setState({groupes: data, groupeSelected: data[0]}) 
          })
          console.log(this.refs.pageSelect.options,258)
          // this.getPost(this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].value)
    }
    
    addPost(){
      fetch('/post/add', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id:this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id,
          newPost:this.state.newPost
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
          
            this.setState({post: data}) 
          })
    }

    add() {
        fetch('/pages/add', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
              
              fr:this.refs.fr.value,
              nl:this.refs.nl.value,
              groupes:this.state.groupesPost
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
              
                this.setState({pages: data}) 
              })

            //   this.refs.info.style.animation = 'open 5000ms ease-in-out forwards'

            //   this.refs.info.onanimationend = () => {
            //     this.refs.info.style.animation = ''

            //   }
    }

    getPost(id){
        console.log(8)
        fetch('/post', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
              
              id:id
            }),
          })
              .then((res) => {
                if (res.status === 200) {
                  console.log('correct: ',res.status)
                  return res.json()
                } 
                else {
                  console.log('error: ',res.status)
                  return null
                }
              })
              .then(data => {
                console.log('data :', data) 
              
                this.setState({post: data.posts,groupePage: data.groupes}) 
              })
    }

    showPreview(e) {
        console.log(e.target.files[0])
        if(e.target.files[0]) {
          const reader = new FileReader()
          reader.onload = () => {
              console.log(reader.result)
            this.setState(prevState => ({newPost: {...prevState.newPost, image: reader.result}}))
          }
          reader.readAsDataURL(e.target.files[0])
        } else {
          this.setState({
            poster: ''
          })
        }
      }

    render() {
        console.log(this.state, 999)
        return(
    <>
            <Navbar />
            <Navigation />
            <div id='page-wrapper'>
                <div id='page-inner'>
                    
                <div className='container-ajout create-page'>
                  <div>
                  <input placeholder='Nom FR' type='text' ref='fr' />
                        <input placeholder='Nom NL' type='text' ref='nl' />
                             
                             <select onChange= {(e) => this.setState({groupeSelected: {id: e.target.options[e.target.selectedIndex].id,nom: e.target.options[e.target.selectedIndex].value}})}>
                      
                        {this.state.groupes.map((elem,index) => (
                    <option id={elem.id}>
                        {elem.nom}
                       
                            
                        </option>
                ))}
                        </select>
                        
                        <button onClick={(e) => {e.preventDefault(); this.setState(prevState => ({groupesPost: [...prevState.groupesPost, this.state.groupeSelected]}))}}>Ajouter un groupe</button>

                  </div>
                        
                        <ul>
                        {this.state.groupesPost.map((elem,index) => (
                    <li>
                        {elem.nom}
                       
                            
                        </li>
                ))
                }
                        </ul>
                         <button onClick={() => this.add()}>Ajouter une page</button>
                        </div>
                        <div ref='info' className='info'>
                            Les données ont bien été ajoutées
                        </div>
                        <select ref='pageSelect' onChange= {(e) => this.getPost(e.target.options[e.target.selectedIndex].id)}>
                            
                        {this.state.pages.map((elem,index) => (
                    <option id={elem.id}>
                        {elem.nom}
                       
                            
                        </option>
                ))}
                        </select>
                        <button onClick={()=>this.setState({switch:!this.state.switch})}>Ajouter un post</button>
                
                {this.state.switch?
                <form>
                    <input onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, titre: e.target.value}}))}} placeholder='Titre FR' type='text'/>
                    <input onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, titreNl: e.target.value}}))}} placeholder='Titre NL' type='text'/>
                    <input  onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, url: e.target.value}}))}} placeholder='URL (optionnel)' type='text'/>
                    <input onChange={(e) => this.showPreview(e)} type='file'/>
                    <img src={this.state.newPost.image}/>
                    <textarea onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, description: e.target.value}}))}} placeholder='Description FR'></textarea>
                    <textarea onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, descriptionNl: e.target.value}}))}} placeholder='Description NL'></textarea>
                    
                         <button onClick={()=>this.addPost()}>Confirmer</button>
                </form>
                
                :
                <div className='container-ajout create-page'>
                  <span className='banner'>Posts liés à la page</span>
                {this.state.post.length===0?
                <span>Aucun post n'est lié à la page</span>
                :
                <ul>
                {this.state.post.map((elem,index) => (
                    <li>
                        {elem.titre}
                       
                            
                        </li>
                ))}
                </ul>
                }
                <span className='banner'>Groupes liés à la page</span>
                {this.state.groupePage.length===0?
                <span>Aucun groupe n'est lié à la page</span>
                :
                <ul>
                {this.state.groupePage.map((elem,index) => (
                <li>
                {elem.nom}
               
                    
                </li>
                ))
                }
                </ul>
                }
                
                </div>
                }
            
                </div>
            </div>
            
            <Footer />
            </>
        )    
    }
  
}

export default Pages