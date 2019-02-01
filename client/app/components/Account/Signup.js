import React, { Component } from 'react';
import 'whatwg-fetch';

export default class Signup extends Component {
    constructor(props) {
      super(props);

      this.state = {
        token:'',
        signUpError: '',
        signUpFirstName: '',
        signUpLastName: '',
        signUpEmail: '',
        signUpPassword:''
      };

      this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
      this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
      this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
      this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

      this.onSignUp = this.onSignUp.bind(this);
    }

    onTextboxChangeSignUpFirstName(event) {
      this.setState({
        signUpFirstName: event.target.value,
      });
    }

    onTextboxChangeSignUpLastName(event) {
      this.setState({
        signUpLastName: event.target.value,
      });
    }

    onTextboxChangeSignUpEmail(event) {
      this.setState({
        signUpEmail: event.target.value,
      });
    }

    onTextboxChangeSignUpPassword(event) {
      this.setState({
        signUpPassword: event.target.value,
      });
    }

    onSignUp() {
      // State
      const {
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword
      } = this.state;

      this.setState({
        isLoading: true
      });

      // POST request
      fetch('/api/account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          email: signUpEmail,
          password: signUpPassword,
        }),
      }).then(res => res.json())
        .then(json => {
          console.log('json', json);
          if (json.success) {
            this.setState({
              signUpError: json.message,
              isLoading: false,
              signUpFirstName: '',
              signUpLastName: '',
              signUpEmail: '',
              signUpPassword: '',
            });
          } else {
            this.setState({
              signUpError: json.message,
              isLoading: false,
            });
          }
        });
    }

    render() {
      const {
        token,
        signUpError,
        signUpFirstName,
        signUpLastName,
        signUpEmail,
        signUpPassword
      } = this.state;

      if (!token) {
        return(
            <div>
              {
                (signUpError) ? (
                  <p>{ signUpError }</p>
                ): (null)
              }
              <p>Sign Up</p>
              <input type="text" placeholder="First Name" value={ signUpFirstName } onChange={ this.onTextboxChangeSignUpFirstName } /><br/>
              <input type="text" placeholder="Last Name" value={ signUpLastName } onChange={ this.onTextboxChangeSignUpLastName } /><br/>
              <input type="email" placeholder="Email" value={ signUpEmail } onChange={ this.onTextboxChangeSignUpEmail } /><br/>
              <input type="password" placeholder="Password" value={ signUpPassword } onChange={ this.onTextboxChangeSignUpPassword } /><br/>
              <button onClick={ this.onSignUp }>Sign Up</button>
            </div>
        )
      }
    }
  }
