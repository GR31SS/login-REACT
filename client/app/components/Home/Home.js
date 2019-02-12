import React, { Component } from 'react';
import 'whatwg-fetch';
import Signup from './login/signup/signup'
import Signin from './login/signin/signin'
import Logout from './logout/logout'

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token:'',
    };

    this.logout = this.logout.bind(this);
    this.signIn = this.signIn.bind(this)
  }

  componentDidMount() {
    const obj = JSON.parse(localStorage.getItem('the_main_app'));
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  // logout() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const obj = getFromStorage('the_main_app');
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // Verify token
  //     fetch('/api/account/logout?token=' + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.success) {
  //           this.setState({
  //             token: '',
  //             isLoading: false
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false,
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //     });
  //   }
  // }
  logout(){
    this.setState({
      token: ''
    })
  }
  signIn(error, loading, password, email, token){
    this.setState({
      signInError: error,
      isLoading: loading,
      signInPassword: password,
      signInEmail: email,
      token: token,
    });
  }
  render() {
    const {
      isLoading,
      token
    } = this.state;
    console.log(token)
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return(
        <div>
          <Signin signIn={this.signIn}/>
          <br/>
          <br/>
          <Signup />
        </div>
      )
    }

    return (
      <div>
        <Logout logout={this.logout}/>
        {/* <p>Account</p>
        <button onClick={ this.logout }>Logout</button> */}
      </div>
    );
  }
}
