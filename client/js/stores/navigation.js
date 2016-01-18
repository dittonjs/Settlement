"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import QueryString    from '../utils/query_string';

var sideBarOpen = false;

var NavigationStore = {...StoreCommon, ...{
  sideBarOpen(){
    return sideBarOpen;
  }
}};

// Register callback with Dispatcher
Dispatcher.register(function(payload) {

  switch(payload.action){
    case Constants.TOGGLE_SIDE_BAR:
      sideBarOpen = !sideBarOpen;
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  NavigationStore.emitChange();

  return true;

});

export default NavigationStore;