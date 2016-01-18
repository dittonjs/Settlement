"use strict";

import React                      from "react";
import BaseComponent              from "../base_component";
import Firebase                   from "firebase";
import SettingsStore              from '../../stores/settings';
import SettlementsStore           from '../../stores/settlements';
import UserDataStore              from '../../stores/user_data';
import NavigationStore            from '../../stores/navigation';
import SettlementActions          from '../../actions/settlements';
import UserDataActions            from '../../actions/user_data';
import Navbar                     from './navbar';
import SideBar                    from './side_bar';
import history                    from '../../history';

export default class GameController extends BaseComponent {

  constructor(props){
    super();
    this.stores = [SettingsStore, SettlementsStore, UserDataStore, NavigationStore];
    this.firebaseSettlementsUrl = `${SettingsStore.current().firebaseUrl}/settlements`;
    this.firebaseSettlementsRef = new Firebase(this.firebaseSettlementsUrl);
    this.firebaseEnteringSettlementsRef = new Firebase(`${SettingsStore.current().firebaseUrl}/entering_settlements`);
    this.firebaseLeavingSettlementsRef = new Firebase(`${SettingsStore.current().firebaseUrl}/leaving_settlements`);
    this.state = this.getState(props);
  }



  getState(props){
    return {
      settlements: SettlementsStore.settlements(),
      user: SettingsStore.user(),
      userData: UserDataStore.userData(),
      currentSettlement: SettlementsStore.currentSettlement(),
      sideBarOpen: NavigationStore.sideBarOpen()
    }
  }

  startGeoLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      SettlementActions.checkIfInSettlement(position);
    });
    this.timeOut = setTimeout(()=>{this.startGeoLocation()}, 5000);
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.currentSettlement.name != this.state.currentSettlement.name){
      console.log("hello", nextState.currentSettlement)
      if(nextState.currentSettlement.name){ 
        this.firebaseEnteringSettlementsRef.push({uid: nextState.user.uid, name: nextState.currentSettlement.name});
      } else {
        this.firebaseLeavingSettlementsRef.push({uid: nextState.user.uid});
      }
    }
  }

  componentDidMount(){
    if(navigator.geolocation){
      this.startGeoLocation();
    }
  }

  componentWillMount(){
    
    if(!SettingsStore.authenticate()){
       console.log("what the check")
      history.pushState(null, "/login");
      return;
    }else{
      history.pushState(null, "/game/user_info");
    }
    this.firebaseUserDataRef = new Firebase(`${SettingsStore.current().firebaseUrl}/user_data/${SettingsStore.user().uid}`);
    this.firebaseUserDataRef.on("value", (dataSnapshot)=>{
      UserDataActions.loadUserData(dataSnapshot.val());
    });
    // Firebase docs for 'on': https://www.firebase.com/docs/web/api/query/on.html
    this.firebaseSettlementsRef.on("value", function(dataSnapshot) {
      SettlementActions.loadSettlement(dataSnapshot);
    }.bind(this));
  }

  render(){
    var styles = {
      container: {
        marginTop: "80px",
      }
    }

    return (
      <div>
        <Navbar sideBarOpen={this.state.sideBarOpen}/>
        <SideBar sideBarOpen={this.state.sideBarOpen} />
        <div style={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }

}