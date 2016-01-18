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
import UserInfoPanels                   from './user_info_panels';
import Settlement                 from './settlement';


export default class UserInfo extends BaseComponent{

  constructor(props){
    super();
    this.stores = [UserDataStore];

    this.state = this.getState(props);
  }

  getState(){
    return {
      userData: UserDataStore.userData(),
    }
  }

  componentWillUnmount(){
    super.componentWillUnmount();
    // this.firebaseSettlementsRef.off();
    // this.firebaseLeavingSettlementsRef.push({uid: this.state.user.uid});
  }
  
  render(){
    return  <div className="container">
              <UserInfoPanels userData={this.state.userData}/>
            </div>;
  }
};