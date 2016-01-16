"use strict";

import React                      from 'react';
import Firebase                   from 'firebase';
import BaseComponent              from '../base_component';
import SettingsStore              from '../../stores/settings';
import SettlementsStore           from '../../stores/settlements';
import SettlementActions          from '../../actions/settlements';
import history                    from '../../history';
export default class SignUp extends React.Component{

  constructor(props){
    super();
    this.firebaseRef = new Firebase(SettingsStore.current().firebaseUrl);
    
  }

  signUp(e){
    e.preventDefault();
    this.firebaseRef.createUser({
      email: this.refs.userName.value,
      password: this.refs.password.value
    }, (error, data)=>{
      console.log(data)
      if(!error){
        var firebaseUserDataRef = new Firebase(`${SettingsStore.current().firebaseUrl}/user_data/${data.uid}`);
        firebaseUserDataRef.set({
          name: this.refs.userName.value,
          exp: 0,
          to_next_level: 100,
          money: 100,
          bases_belonged_to: {
            count: 0
          },
          health: 20,
          strength: 1,
          intelligence: 1,
          defense: 1,
          inventory: {
            other: [{
              name: "Users Guide", 
              description: "A new users guide to Settlements",
              buy_value: 10
            }], 
            weapons: [{
              name: "Fists", 
              damage: 2, 
              effect: null,
              buy_value: 0,
            }],
            apparel: [{
              name: "Street Clothes", defense: 1, effect: null, buy_value: 15,
            }],
            usable: [{
              name: "Bandage",
              value: 5,
              key: "health",
              buy_value: 10
            }]
          },
          weapon: {
            name: "Fists", 
            damage: 2, 
            effect: null,
            buy_value: 0
          },
          apparel: {
            name: "Street Clothes", 
            defense: 1, 
            effect: null,
            buy_value: 15,
          }
        });
        history.pushState(null, "login");
      }
    });
  }

  render(){
    return(<div>
      <h1>This is the signup page</h1>
      <div>
        User Name: <input type="text" ref="userName"></input>
      </div>
      <div>
        Password <input type="password" ref="password"></input>
      </div>
      <div>
        <button type="button" onClick={e=>this.signUp(e)}>Sign Up</button>
      </div>
    </div>);
  }
};