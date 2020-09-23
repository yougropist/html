import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import "./index.scss"

class Pages extends Component  {
    constructor(props){
        super(props)
        this.state = {
            pages: [],
            post: [],
            groupes: [],
            groupesPost: [],
            groupePage: [],
            update: {index: '', i: ''},
            groupeSelected: {id: '',nom: '', icon: ''},
            pageSelected: '',
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
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            // console.log('data :', data, 199999999999999999) 
          
            this.setState({
              pages: data,
              pageSelected: data[0].id
            }) 

            this.getGroupesByPage(data[0].id)
          })

          fetch('/groupes')
        .then((res) => {
            if (res.status === 200) {
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            // console.log('data :', data) 
          
            this.setState({groupes: data, groupeSelected: data[0]}) 
          })

          fetch('/post/get')
        .then((res) => {
            if (res.status === 200) {
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            // console.log('data :', data) 
          
            this.setState({post: data}) 
          })
    }

    getGroupesByPage(id) {
      // console.log('yes')
      fetch('/groupe/page', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id: id,
        }),
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        // console.log('groupePage :', data) 
      
        this.setState({groupePage: data}) 
      })
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

    updateGroupe(){
      fetch('/groupe/update', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          
          id: this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id,
          groupe: this.refs.selectGroupeUpdate.options[this.refs.selectGroupeUpdate.selectedIndex].id
        }),
      })
          .then((res) => {
            if (res.status === 200) {
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            console.log('data :', data) 
          this.setState({groupePage:data})
            
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

           
    }

    getPost(id){
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
        if(e.target.files[0]) {
          const reader = new FileReader()
          reader.onload = () => {
            this.setState(prevState => ({newPost: {...prevState.newPost, image: reader.result}}))
          }
          reader.readAsDataURL(e.target.files[0])
        } else {
          this.setState({
            poster: ''
          })
        }
      }

      updateImage(id,e){
        if(e.target.files[0]) {
          const reader = new FileReader()
          reader.onload = () => {
              fetch('/image/update', {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                  page:this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id,
                  post:id,
                  image:reader.result
                }),
              })
                  .then((res) => {
                    if (res.status === 200) {
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
          reader.readAsDataURL(e.target.files[0])
        } 
      }
      
      updateInput(id,index,i){
        console.log(this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id, id, this.refs[`input${index}-${i}`].value, i, 5666)
        fetch('/input/update', {
          method: 'PUT',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            page:this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id,
            post:id,
            content:this.refs[`input${index}-${i}`].value,
            i:i
          }),
        })
            .then((res) => {
              if (res.status === 200) {
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

      deleteGroupe(groupeId){
        fetch('/groupe/delete', {
          method: 'DELETE',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            
            id: this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id,
            groupe: groupeId
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
              console.log('delete :', data) 
            
              this.setState({groupePage:data})
            })
      }

      deletePost(idPost) {
        fetch('/post/delete', {
          method: 'DELETE',
          headers: new Headers({
              'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            idPost: idPost
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
          console.log('delete :', data) 
        
          this.setState({post:data})
        })
      }

    render() {
        // console.log(this.state.pageSelected, 999)
        const postElem = [
          {type: 'input', title: 'Titre en français :', content: 'titre'}, 
          {type: 'input', title: 'Titre en néerlandais :', content: 'titreNL'}, 
          {type: 'input', title: 'URL :', content: 'url'}, 
          {type: 'image', title: 'Image :'}, 
          {type: 'textarea', title: 'Description en français :', content: 'descriptio'}, 
          {type: 'textarea', title: 'Description en néerlandais :', content: 'descriptioNL'}
        ]
        return(
    <>
            <Navbar />
            <Navigation />
            <div id='page-wrapper'>
                <div id='page-inner'>
                    
                <div className='container-ajout create-page'>
                <span className='banner'>Création de page</span>
                  <div className="creation-inputs">
                  <input placeholder='Nom FR' type='text' ref='fr' />
                        <input placeholder='Nom NL' type='text' ref='nl' />
                             
                             <select onChange= {(e) => this.setState({groupeSelected: {id: e.target.options[e.target.selectedIndex].id, nom: e.target.options[e.target.selectedIndex].value, icon: this.state.groupes.filter(elem => elem.id === e.target.options[e.target.selectedIndex].id)[0].icon}})}>
                      
                        {this.state.groupes.map((elem,index) => (
                    <option id={elem.id}>
                        {elem.nom}
                       {/* {console.log(elem, 'groupe')} */}
                            
                        </option>
                ))}
                        </select>
                        
                        <button onClick={(e) => {e.preventDefault(); this.setState(prevState => ({groupesPost: [...prevState.groupesPost, this.state.groupeSelected]}))}}>Ajouter un groupe</button>

                  </div>
                        
                        <ul>
                        {this.state.groupesPost.map((elem,index) => (
                    <li>
                      {console.log(this.state.groupesPost, this.state.groupeSelected, 'here')}
                        <div style={{flexDirection: 'column', alignItems: 'center'}}>
                          <i className={`${elem.icon} fa-2x`}></i>
                          <p>{elem.nom}</p>
                      </div>
                       
                            
                        </li>
                ))
                }
                        </ul>
                         <button onClick={() => this.add()}>Ajouter une page</button>
                        </div>
                        <div ref='info' className='info'>
                            Les données ont bien été ajoutées
                        </div>

                        <div className="container-ajout create-page">
                        <span className='banner'>Gestion de page</span>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                        <select ref='pageSelect' onChange= {(e) => this.setState({pageSelected: e.target.options[e.target.selectedIndex].id}, () => this.getGroupesByPage(this.state.pageSelected))}>
                            
                        {this.state.pages.map((elem,index) => (
                    <option id={elem.id}>
                        {elem.nom}
                       
                            
                        </option>
                ))}
                        </select>
                        <button onClick={()=>this.setState({switch:!this.state.switch})}>{this.state.switch ? 'Retourner sur la page' : 'Ajouter un post'}</button>
                        </div>
                        </div>
                
                {this.state.switch?
                <form className="newPost">
                    <input onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, titre: e.target.value}}))}} placeholder='Titre FR' type='text'/>
                    <input onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, titreNl: e.target.value}}))}} placeholder='Titre NL' type='text'/>
                    <input  onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, url: e.target.value}}))}} placeholder='URL (optionnel)' type='text'/>
                    <input style={{display: 'none'}} id="postImage" onChange={(e) => this.showPreview(e)} type='file' accept="image/*"/>
                    <div><label htmlFor="postImage">Ajouter une image</label></div>
                    <img alt="" src={this.state.newPost.image}/>
                    <textarea onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, description: e.target.value}}))}} placeholder='Description FR'></textarea>
                    <textarea onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, descriptionNl: e.target.value}}))}} placeholder='Description NL'></textarea>
                    
                         <div><button onClick={()=>this.addPost()}>Confirmer</button></div>
                </form>
                
                :
                <div className='container-ajout create-page'>
                  <span className='banner'>Groupes liés à la page</span>
                {this.state.groupePage.length ===0 ?
                <span>Aucun groupe n'est lié à la page</span>
                :
                <ul>
                {this.state.groupePage.map((elem,index) => (
                <li>
                  <div style={{flexDirection: 'column', alignItems: 'center'}}>
                    <i className={`${elem.icon} fa-2x`}></i>
                    <p>{elem.nom}</p>
                  </div>
                  <button className="deleteGroupe" onClick={()=>this.deleteGroupe(elem.id)}>
                    <i className="fa fa-trash fa-1x"></i>
                  </button>
               
                    
                </li>
                ))
                }
                </ul>
                }
                <div style={{display: 'flex'}}>
                <select ref='selectGroupeUpdate' style={{marginRight: '20px'}} onChange= {(e) => this.setState({groupeSelected: {id: e.target.options[e.target.selectedIndex].id,nom: e.target.options[e.target.selectedIndex].value}})}>
                      
                      {this.state.groupes.map((elem,index) => (
                  <option id={elem.id}>
                      {elem.nom}
                     
                          
                      </option>
              ))}
                      </select>
                      
                      <button onClick={() => this.updateGroupe()}>Ajouter un groupe</button>
                 </div>

                  <span className='banner'>Posts liés à la page</span>
                {this.state.post.filter(elem => elem.id_pages === this.state.pageSelected).length === 0 ?
                <span>Aucun post n'est lié à la page</span>
                :
                <ul className='listPost'>
                {this.state.post.map((elem,index) => (
                  
                    <li style={{display: elem.id_pages !== this.state.pageSelected ? 'none' : 'initial'}}>
                      <div className="controlPost"><button onClick={() => this.deletePost(elem.id)}><i className="fa fa-trash fa-2x"></i></button></div>
                      <ul>
                        {postElem.map((el,i)=>{
                          switch(true) {
                            case el.type === 'input':
                              return <li><p>{el.title}</p><div><input  ref={`input${index}-${i}`} defaultValue={elem[el.content]} disabled={this.state.update.index===index&&this.state.update.i===i ?  false:true} type='text' /><button className={this.state.update.index===index&&this.state.update.i===i ? 'valide':''} onClick={(e)=> {this.setState({update: index===this.state.update.index&&i===this.state.update.i?{index:'',i:''}:{index:index,i:i}}); index===this.state.update.index&&i===this.state.update.i&& this.updateInput(elem.id,index,i)}}>{this.state.update.index===index&&this.state.update.i===i ? 'Valider':'Modifier'}</button></div></li>
                              
                            case el.type === 'image':
                              return <li><p>{el.title}</p><div><img alt="" src={elem.image} /><label htmlFor={`image${index}-${i}`}>Modifier</label><input onChange={(e)=> this.updateImage(elem.id,e)} id={`image${index}-${i}`} type='file' accept="image/*" style={{display:'none'}}/></div></li>
                                   
                            case el.type === 'textarea': 
                              return <li><p>{el.title}</p><div><textarea ref={`input${index}-${i}`} defaultValue={elem[el.content]} disabled={this.state.update.index===index&&this.state.update.i===i ?  false:true}></textarea><button className={this.state.update.index===index&&this.state.update.i===i ? 'valide':''} onClick={()=> {this.setState({update: index===this.state.update.index&&i===this.state.update.i?{index:'',i:''}:{index:index,i:i}}); index===this.state.update.index&&i===this.state.update.i&& this.updateInput(elem.id,index,i)}}>{this.state.update.index===index&&this.state.update.i===i ? 'Valider':'Modifier'}</button></div></li>
                              
                          }
                        }
                        )}
                        {/* <li><p>Titre en français:</p><div><input disabled={index===this.state.update? false:true} type='text' value={elem.titre}/><button>Modifier</button></div></li>
                        <li><p>Titre en Néerlandais:</p><div><input type='text' value={elem.titreNL}/><button>Modifier</button></div></li>
                        <li><p>URL:</p><div><input type='text' value={elem.url}/><button>Modifier</button></div></li>
                        <li><p>Image</p><div><img src={elem.image} /><button>Modifier</button></div></li>
                        <li><p>Description en Français:</p><div><textarea defaultValue={elem.descriptio}></textarea><button>Modifier</button></div></li>
                        <li><p>Description en Néerlandais:</p><div><textarea defaultValue={elem.descriptioNL}></textarea><button>Modifier</button></div></li> */}
                        
                      </ul>
                        
  
                        </li>
                ))}
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