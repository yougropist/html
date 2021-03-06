import React, {Component} from 'react'
import './index.scss'

class MailBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: ''
    }
  }


  sendMail(inputs) {
    fetch('/contact', {
      method: 'POST',
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        subject: this.state.subject,
        message: this.state.message
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
      if(data === false) {
        document.getElementById('info').textContent = "Echec de l'envoi..."
        setTimeout(() => {document.getElementById('info').textContent = ""}, 5000)
      } 
      else {
        document.getElementById('info').textContent = "Envoyé avec succès !"
        setTimeout(() => {document.getElementById('info').textContent = ""}, 5000)
    
        inputs.map(elem => {
          this.refs[elem].value = ''
        })

        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        })
      }
    })
  }

  verifyInputs() {
    const inputs = ['firstName', 'lastName', 'email', 'subject', 'message']
    
    inputs.filter(elem => this.state[elem] === '').map(elem => {
      this.refs[elem].style.border = '2px solid rgb(255, 90, 68)'
    })

    if(inputs.filter(elem => this.state[elem] === '').length === 0) this.sendMail(inputs)
  }

  render() {
    return (
      <div className="mailBox">
        <div style={{color: this.state.open && 'transparent'}} className="mailHeader" onClick={() => this.setState({open: !this.state.open})}>
          <p style={{color: this.state.open && 'transparent'}}>Nous contacter ?</p>
          <button style={{display: !this.state.open && 'none'}}><span></span></button>
          <span id="info" style={{display: !this.state.open && 'none'}}></span>
        </div>
        <div className={`mailBody ${this.state.open && 'bodyOpen'}`}>
          <div>
            <input ref='firstName' required placeholder="Prénom" type="text" onChange={e => this.setState({firstName: e.target.value})} />
            <input ref='lastName' required placeholder="Nom" type="text" onChange={e => this.setState({lastName: e.target.value})} />
          </div>
          <input ref='email' required placeholder="Votre adresse email" type="email" onChange={e => this.setState({email: e.target.value})} />
          <input ref='subject' required placeholder="Sujet" type="text" onChange={e => this.setState({subject: e.target.value})} />
          <textarea ref='message' required placeholder="Message" onChange={e => this.setState({message: e.target.value})}></textarea>
          <button onClick={() => this.verifyInputs()}>
            <p>Envoyer</p>
          </button>
        </div>
      </div>
    )
  }

}

export default MailBox