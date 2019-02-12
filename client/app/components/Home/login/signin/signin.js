import React, { Component } from 'react';
// import 'whatwg-fetch';

import {
  getFromStorage,
  setInStorage
} from '../../../../utils/storage';

export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token:'',
      signInError: '',
      signInEmail: '',
      signInPassword:'',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onSignIn() {
    // State
    const {
      signInEmail,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true
    });

    // POST request
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.props.signIn(json.message, false, '', '', json.token)

        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  render() {
    const {
      token,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    if (!token) {
      return(
        <div>
        {
            (signInError) ? (
            <p>{ signInError }</p>
            ) : (null)
        }
        <p>Sign In</p>
        <input type="email" placeholder="Email" value={ signInEmail } onChange={ this.onTextboxChangeSignInEmail } /><br/>
        <input type="password" placeholder="Password" value={ signInPassword } onChange={ this.onTextboxChangeSignInPassword } /><br/>
        <button onClick={ this.onSignIn }>Sign In</button>
        </div>
      )
    }
  }
}
