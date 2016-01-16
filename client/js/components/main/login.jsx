"use strict";

import React                      from 'react';
import Firebase                   from 'firebase';
import BaseComponent              from '../base_component';
import SettingsStore              from '../../stores/settings';
import SettingsActions            from '../../actions/settings';
import SettlementsStore           from '../../stores/settlements';
import SettlementActions          from '../../actions/settlements';
import history                    from '../../history';
export default class Login extends BaseComponent{

  constructor(props){
    super(props);
    this.stores = [SettingsStore];
    this.firebaseRef = new Firebase(SettingsStore.current().firebaseUrl);
    this.state = this.getState();
    this.state.message = "";
  }

  getState(){
    return {
      user: SettingsStore.user()
    }
  }

  componentDidUpdate(nextProps, nextState){
    if(nextState.user.loggedIn){
      history.pushState(null, "/");
    }
  }

  toSignUp(){
    history.pushState(null,"/sign_up");
  }

  login(e){
    e.preventDefault();
    this.firebaseRef.authWithPassword({
      email: this.refs.userName.value,
      password: this.refs.password.value,
    }, (error, data)=>{
      if(error){
        this.setState({message: error.toString()});
      } else {
        SettingsActions.login(data);
      }
    });
  }
  render(){
    return(<div className="container">
            <h1>Login</h1>
            <div>
              User Name: <input type="text" ref="userName"></input>
            </div>
            <div>
              Password <input type="password" ref="password"></input>
            </div>
            <div>
              <button className="btn" type="button" onClick={e=>this.toSignUp()}>Sign Up</button>
              <button className="btn" type="button" onClick={e=>this.login(e)}>Login</button>
            </div>
            <div>
              {this.state.message}
            </div>
          </div>);
  }
};