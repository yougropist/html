import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import "./index.scss"
import e from 'cors';
import ReactHtmlParser from 'react-html-parser';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



class Pages extends Component  {
    constructor(props){
        super(props)
        this.state = {
            pages: [],
            post: [],
            groupes:[],
            groupesPost: [],
            groupePage: [],
            update:{index:'',i:''},
            groupeSelected: {id:'',nom:''},
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
              // console.log('correct: ',res.status)
              return res.json()
            } 
            else {
              console.log('error: ',res.status)
              return null
            }
          })
          .then(data => {
            console.log('data :', data, 199999999999999999) 
          
            this.setState({pages: data}) 
            this.setState({pageSelected: this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id})

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
            console.log('data :', data) 
          
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
            console.log('data :', data) 
          
            this.setState({post: data}) 
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
            console.log(data, 123)
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

      updateImage(id,e){
        console.log(e.target.files[0])
        if(e.target.files[0]) {
          const reader = new FileReader()
          reader.onload = () => {
              console.log(reader.result)
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
          reader.readAsDataURL(e.target.files[0])
        } 
      }
      
      updateInput(id,index,i){
        console.log(this.refs.pageSelect.options[this.refs.pageSelect.selectedIndex].id,id,this.refs[`input${index}-${i}`].value,i,5666)
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
            
              this.setState({groupePage:data})            })
      }

    render() {
        console.log(this.state, 999,this.state.update.index===0&&this.state.update.i===0 )
        const postElem = [
          {type: 'input', title: 'Titre en français :', content: 'titre'}, 
          {type: 'input', title: 'Titre en néerlandais :', content: 'titreNL'}, 
          {type: 'input', title: 'URL :', content: 'url'}, 
          {type: 'image', title: 'Image :'}, 
          {type: 'textarea', title: 'Description en français', content: 'descriptio'}, 
          {type: 'textarea', title: 'Description en néerlandais', content: 'descriptioNL'}
        ]
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
                        <select ref='pageSelect' onChange= {(e) => this.setState({pageSelected: e.target.options[e.target.selectedIndex].id})}>
                            
                        {this.state.pages.map((elem,index) => (
                    <option id={elem.id}>
                        {elem.nom}
                       
                            
                        </option>
                ))}
                        </select>
                        <button onClick={()=>this.setState({switch:!this.state.switch})}>Ajouter un post</button>
                
                {this.state.switch?
                <form>
                  {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"

                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState(prevState => ({newPost: {...prevState.newPost, titre: data}}))}
                        
                    } 
                   
                /> */}
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
                  <span className='banner'>Groupes liés à la page</span>
                {this.state.groupePage.length===0?
                <span>Aucun groupe n'est lié à la page</span>
                :
                <ul>
                {this.state.groupePage.map((elem,index) => (
                <li>
                  <p>{elem.nom}</p>
                  <span onClick={()=>this.deleteGroupe(elem.id)}>X</span>
                
               
                    
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
                {this.state.post.length===0?
                <span>Aucun post n'est lié à la page</span>
                :
                <ul className='listPost'>
                {this.state.post.map((elem,index) => (
                  
                    <li style={{display: elem.id_pages != this.state.pageSelected ? 'none' : 'initial'}}>
                      <ul>
                        {postElem.map((el,i)=>{
                          switch(true) {
                            case el.type === 'input':
                              return <li><p>{el.title}</p><div><input  ref={`input${index}-${i}`} defaultValue={elem[el.content]} disabled={this.state.update.index===index&&this.state.update.i===i ?  false:true} type='text' /><button className={this.state.update.index===index&&this.state.update.i===i ? 'valide':''} onClick={(e)=> {this.setState({update: index===this.state.update.index&&i===this.state.update.i?{index:'',i:''}:{index:index,i:i}}); index===this.state.update.index&&i===this.state.update.i&& this.updateInput(elem.id,index,i)}}>{this.state.update.index===index&&this.state.update.i===i ? 'Valider':'Modifier'}</button></div></li>
                              break;
                            case el.type === 'image':
                            return <li><p>{el.title}</p><div><img src={elem.image} /><label htmlFor='image'>Modifier</label><input onChange={(e)=>this.updateImage(elem.id,e)} id='image' type='file' style={{display:'none'}}/></div></li>
                              break;      
                            return <li><p>{el.title}</p><div><textarea ref={`input${index}-${i}`} defaultValue={elem[el.content]} disabled={this.state.update.index===index&&this.state.update.i===i ?  false:true}></textarea><button className={this.state.update.index===index&&this.state.update.i===i ? 'valide':''} onClick={()=> {this.setState({update: index===this.state.update.index&&i===this.state.update.i?{index:'',i:''}:{index:index,i:i}}); index===this.state.update.index&&i===this.state.update.i&& this.updateInput(elem.id,index,i)}}>{this.state.update.index===index&&this.state.update.i===i ? 'Valider':'Modifier'}</button></div></li>
                              break;
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