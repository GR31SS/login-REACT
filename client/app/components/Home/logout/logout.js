import React, { Component } from 'react';
import 'whatwg-fetch';

import {
    getFromStorage,
    setInStorage,
    removeFromStorage
  } from '../../../utils/storage';

export default class Home extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        token:'',
      };

      this.logout = this.logout.bind(this);
    }

    // componentDidMount() {
    //   const obj = getFromStorage('the_main_app');
    //   if (obj && obj.token) {
    //     const { token } = obj;
    //     // Verify token
    //     fetch('/api/account/verify?token=' + token)
    //       .then(res => res.json())
    //       .then(json => {
    //         if (json.success) {
    //           this.setState({
    //             token,
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

    logout() {
      this.setState({
        isLoading: true,
      });
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        // Verify token
        fetch('/api/account/logout?token=' + token)
          .then(res => res.json())
          .then(json => {
              console.log(json)
            if (json.success) {
                removeFromStorage('the_main_app')
                this.props.logout()
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

    render() {
      return (
        <div>
          <p>Account</p>
          <button onClick={ this.logout }>Logout</button>

        </div>
      );
    }
  }
