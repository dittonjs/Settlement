"use strict";

import React                      from 'react';
import Firebase                   from 'firebase';
import BaseComponent              from '../base_component';
import SettingsStore              from '../../stores/settings';
import SettlementsStore           from '../../stores/settlements';
import UserDataStore              from '../../stores/user_data';
import SettlementActions          from '../../actions/settlements';
import UserDataActions            from '../../actions/user_data';
import history                    from '../../history';
import UserInfo                   from './user_info';
import Game                       from './game';
import Settlement                 from './settlement';


export default class Home extends BaseComponent{

  constructor(props){
    super();
    this.stores = [SettingsStore, SettlementsStore, UserDataStore];
    this.firebaseSettlementsUrl = `${SettingsStore.current().firebaseUrl}/settlements`;
    this.firebaseSettlementsRef = new Firebase(this.firebaseSettlementsUrl);
    this.state = this.getState(props);
  }

  getState(){
    return {
      settlements: SettlementsStore.settlements(),
      user: SettingsStore.user(),
      userData: UserDataStore.userData()
    }
  }

  componentWillMount(){
    if(!SettingsStore.authenticate()){
      history.pushState(null, "/login");
      return;
    }
    this.firebaseUserDataRef = new Firebase(`${SettingsStore.current().firebaseUrl}/user_data/${SettingsStore.user().uid}`);
    this.firebaseUserDataRef.on("value", (dataSnapshot)=>{
      UserDataActions.loadUserData(dataSnapshot.val());
    });
    // Firebase docs for 'on': https://www.firebase.com/docs/web/api/query/on.html
    this.firebaseSettlementsRef.on("value", function(dataSnapshot) {
      SettlementActions.loadSettlement(dataSnapshot);
    }.bind(this));

    this.firebaseSettlementsRef.on("child_removed", function(dataSnapshot) {
      delete this.state.settlements[dataSnapshot.key()];
      this.setState({ settlements: this.state.settlements });
    }.bind(this));

  }

  componentWillUnmount(){
    super.componentWillUnmount();
    this.firebaseSettlementsRef.off();
  }
  
  handleAdd(e){
    e.preventDefault();
    this.firebaseSettlementsRef.push({
      name: this.refs.newItem.value
    });
  }

  handleDelete(e, id){
    e.preventDefault();
    var itemRef = new Firebase(`${this.firebaseSettlementsUrl}/${id}`);
    itemRef.remove();
  }

  render(){
    return  <div className="container">
              <UserInfo userData={this.state.userData}/>
              <Game userData={this.state.userData}/>
              <Settlement userData={this.state.userData}/>
            </div>;
  }
};