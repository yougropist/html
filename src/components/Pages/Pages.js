import React, {Component} from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Navigation from '../Navigation/Navigation';
import "./index.scss"
import icon15 from '../../assets/img/icone/15a.png';

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
            idPostSelected: '',
            postSelected: {
              id: "",
              image: "",
              id_pages: "",
              titre: "",
              titreNL: "",
              descriptio: "",
              descriptioNL: "",
              url: ""
            },
            viewPost: false,
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
      // if(!window.redirect) {window.location.href='/'}  
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
            console.log('data :', data, 199999999999999999) 
          
            this.setState({
              pages: data
            }) 

            // this.getGroupesByPage(data[0].id)
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
      // console.log('get groupes by pages: ',id)
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
      console.log(this.state.pageSelected, this.state.newPost)
      fetch('/post/add', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id:this.state.pageSelected,
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
        this.getGroupesByPage(this.state.pageSelected)    
        this.getPost(this.state.pageSelected)
        this.setState({post: data, switch: false, newPost: {}, viewPost: false}) 
      })
    }

    updateGroupe(groupe){
      // console.log(groupe, this.state.pageSelected)
      fetch('/groupe/update', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({          
          id: this.state.pageSelected,
          groupe: groupe.id
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
        // console.log('data :', data) 
      this.setState({groupePage:data})        
      })
    }

    add() {
      console.log(document.getElementById('fr').value, document.getElementById('nl').value)
      fetch('/pages/add', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({              
          fr: document.getElementById('fr').value,
          nl: document.getElementById('nl').value
          // groupes: this.state.groupesPost
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
        document.getElementById('fr').value = ""    
        document.getElementById('nl').value = "" 
        this.setState({pages: data}) 
      })           
    }

    getPost(id){
      // console.log("GET POST: ", id)
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
          // console.log('correct: ',res.status)
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        // console.log('data :', data)       
        this.setState({post: data.posts , groupePage: data.groupes, pageSelected: id}) 
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
              page:document.getElementById('pageSelect').options[document.getElementById('pageSelect').selectedIndex].id,
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
      
    updateInput(idPost){
      console.log(idPost)
      fetch('/input/update', {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          id:idPost,
          titre: document.getElementById('titreFr').value,
          titreNl: document.getElementById('titreNl').value,
          url: document.getElementById('url').value,
          descFr: document.getElementById('descFr').value,
          descNl: document.getElementById('descNl').value,
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
        this.setState({postSelected: data}, this.getPost(this.state.pageSelected))
      })
    }

    deleteGroupe(groupeId){
      console.log(groupeId)
      fetch('/groupe/delete', {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({            
          id: this.state.pageSelected,
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
        this.getGroupesByPage(this.state.pageSelected)
        this.getPost(this.state.pageSelected)
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
          // console.log('correct: ',res.status)
          return res.json()
        } 
        else {
          console.log('error: ',res.status)
          return null
        }
      })
      .then(data => {
        console.log('delete :', data)         
        this.getGroupesByPage(this.state.pageSelected)
        this.getPost(this.state.pageSelected)
      })
    }

    deletePage(id){
      console.log('delete page: ',id)
      fetch('/page/delete', {
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({          
          id: id
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
        this.setState({pages: data})
      })
    }

    render() {
      console.log(this.state ,111)
      // console.log(this.state.post.filter(elem => elem.id_pages === this.state.pageSelected), 999)
      
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
                <h2 style={{textAlign: 'center'}}>PANEL DES PAGES / POSTES</h2>
                <div className='container-ajout create-page'>
                  <span className='banner'>Création de page</span>
                  <div className="creation-inputs">
                    <input placeholder='Nom FR' type='text' id='fr' />
                    <input placeholder='Nom NL' type='text' id='nl' />
                  </div>
                  <button onClick={() => this.add()}>Ajouter une page</button>
                </div>
                <div className="container-ajout create-page">
                  <span className='banner'>Gestion de page</span>
                  <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                    {this.state.pages.map((elem,index) => (
                      <span style={{margin: 5, padding: 5, backgroundColor: '#a9bcff', borderRadius: 5}} >
                        <button className='btn btn-success' onClick={() => this.setState({viewPost: false, switch: false}, this.getGroupesByPage(elem.id), this.getPost(elem.id))} id={elem.id}>{elem.nom}</button> 
                        <button className='btn btn-danger' onClick={() => this.deletePage(elem.id)} >x</button>
                      </span>
                    ))}
                  </div>
                </div>   
                <div style={{textAlign: 'center'}}>
                  {this.state.switch === true && <button style={{margin: '0 auto'}} className='btn btn-danger' onClick={()=>this.setState({switch:!this.state.switch, newPost: {}})}>Retour</button>  }            
                </div>
                {this.state.switch?
                <div className="newPost">
                  <input onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, titre: e.target.value}}))}} placeholder='Titre FR' type='text'/>
                  <input onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, titreNl: e.target.value}}))}} placeholder='Titre NL' type='text'/>
                  <input onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, url: e.target.value}}))}} placeholder='URL (optionnel)' type='text'/>
                  <input onChange={(e) => this.showPreview(e)} style={{display: 'none'}} id="postImage"  type='file' accept="image/*"/>
                  <div><label className='btn btn-primary' htmlFor="postImage">Ajouter une image</label></div>
                  <img alt="" max-width='200px' src={this.state.newPost.image}/>
                  <textarea onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, description: e.target.value}}))}} placeholder='Description FR'></textarea>
                  <textarea onChange={(e) => {e.persist(); this.setState(prevState => ({newPost: {...prevState.newPost, descriptionNl: e.target.value}}))}} placeholder='Description NL'></textarea>
                  <div><button className='btn btn-success' onClick={()=>this.addPost()}>Confirmer</button></div>
                </div>               
                :
                <div className='container-ajout create-page'>
                  <span className='banner'>Groupes liés à la page</span>
                {this.state.groupePage.length === 0 ?
                <span>Aucun groupe n'est lié à la page</span>                
                :
                <ul>
                  {this.state.groupePage.map((elem,index) => (
                    <li>
                      <p>{elem.nom}</p>
                      <button  className="btn btn-danger" onClick={()=>this.deleteGroupe(elem.id)}>x</button> 
                    </li>
                  ))}
                </ul>
                }
                <div style={{display: this.state.pageSelected !== '' ? 'flex' : 'none'}}>
                  <select ref='selectGroupeUpdate' style={{marginRight: '20px'}} onChange= {(e) => this.setState({groupeSelected: {id: e.target.options[e.target.selectedIndex].id, nom: e.target.options[e.target.selectedIndex].value}})}>
                    {this.state.groupes.map((elem,index) => (
                      <option id={elem.id}>
                        {elem.nom}
                      </option>
                    ))}
                  </select>                      
                  <button className='btn btn-success' style={{fontSize: 25}} onClick={() => this.updateGroupe(this.state.groupeSelected)}>+</button>
                </div>
                <span className='banner'>Posts liés à la page</span>
                {this.state.switch !== true && this.state.pageSelected !== '' && <button className='btn btn-primary' onClick={()=>this.setState({switch:!this.state.switch})}>Ajouter un post</button>  }
                {this.state.post.filter(elem => elem.id_pages === this.state.pageSelected).length === 0 ?
                  <span>Aucun post n'est lié à la page</span>
                  :
                  <div style={{textAlign: 'center'}}>
                    <ul style={{display: this.state.viewPost === false ? 'initial' : 'none'}} className='listPost'>
                      {this.state.post.map((elem,index) => (
                        <li style={{padding: 0, width:700}}>
                          <button className='btn btn-danger' onClick={() => this.deletePost(elem.id)}>x</button>
                          <button className='btn btn-primary' onClick={() => this.setState({viewPost: true, postSelected: elem})}>{elem.titre}</button>
                        </li>    
                      ))}
                    </ul>
                    <ul style={{display: this.state.viewPost === true ? 'initial' : 'none'}} className='listPost'>
                      <button className='btn btn-success' onClick={() => this.setState({viewPost: false, postSelected: {}})}>Retour</button>
                      <p>TITRE FR:</p> <input onChange={(e) => {e.persist(); this.setState(prevState => ({postSelected: {...prevState.postSelected, titre: e.target.value}}))}} id='titreFr' style={{ width: 700}} className='form-control' defaultValue={this.state.postSelected.titre} /> 
                      <p>TITRE NL:</p><input onChange={(e) => {e.persist(); this.setState(prevState => ({postSelected: {...prevState.postSelected, titreNL: e.target.value}}))}} id='titreNl' className='form-control' defaultValue={this.state.postSelected.titreNL} /> 
                      <p>URL:</p><input onChange={(e) => {e.persist(); this.setState(prevState => ({postSelected: {...prevState.postSelected, url: e.target.value}}))}} id='url' className='form-control' defaultValue={this.state.postSelected.url} />
                      <p>DESCRIPTION FR:</p><textarea onChange={(e) => {e.persist(); this.setState(prevState => ({postSelected: {...prevState.postSelected, descriptio: e.target.value}}))}} id='descFr' className='form-control' defaultValue={this.state.postSelected.descriptio} />
                      <p>DESCRIPTION NL:</p><textarea onChange={(e) => {e.persist(); this.setState(prevState => ({postSelected: {...prevState.postSelected, descriptioNL: e.target.value}}))}} id='descNl' className='form-control' defaultValue={this.state.postSelected.descriptioNL} />
                      <button onClick={() => this.setState({viewPost: false}, this.updateInput(this.state.postSelected.id))} className='btn btn-warning'>Modifier</button>
                    </ul>
                  </div>
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