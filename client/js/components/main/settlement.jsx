"use strict";

import React from 'react';
import BaseComponent from '../base_component';
import SettlementsActions from "../../actions/settlements";
import SettlementsStore   from '../../stores/settlements';
export default class Settlement extends BaseComponent{
  constructor(props){
    super();
    this.stores = [SettlementsStore]
    this.state = this.getState(props);
  }

  getState(props){
    return {
      currentSettlement: SettlementsStore.currentSettlement()
    }
  }

  render(){

    var content;
    if(!this.state.currentSettlement || !this.state.currentSettlement.name){
      content = <div>You are not at a settlement right now</div>
    } else {
      content = <div>
                  <h2>{this.state.currentSettlement.name}</h2>
                </div>
    }
    console.log(this.state.position);
    return  <div>
              <h2>Settlement</h2>
              {content}
            </div>
  }

};