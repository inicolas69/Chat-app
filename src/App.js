import React, { Component, createRef } from 'react'
import './App.css'
import './animations.css'
import Formulaire from './components/Formulaire'
import Message from './components/Message'

// Firebase
import base from './base'

// Transitions
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  messagesRef = createRef()

  componentDidMount () {
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  componentDidUpdate () {
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message
    Object.keys(messages)
      .slice(1, -11)
      .forEach(key => {
        messages[key] = null
      })
    this.setState({ messages })
  }

  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    const messages = Object.keys(this.state.messages).map(key => (
      <CSSTransition timeout={2000} classNames='fade' key={key}>
        <Message
          isUser={this.isUser}
          message={this.state.messages[key].message}
          pseudo={this.state.messages[key].pseudo}
        />
      </CSSTransition>
    ))

    return (
      <div className='box'>
        <div>
          <div className='messages' ref={this.messagesRef}>
            <TransitionGroup className='message'>{messages}</TransitionGroup>
          </div>
        </div>
        <Formulaire
          addMessage={this.addMessage}
          pseudo={this.state.pseudo}
          length={140}
        />
      </div>
    )
  }
}

export default App
