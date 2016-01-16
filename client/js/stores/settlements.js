"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import QueryString    from '../utils/query_string';

var _settlements = {};

var SettlementsStore = {...StoreCommon, ...{
  settlements(){
    return _settlements;
  }
}};

// Register callback with Dispatcher
Dispatcher.register(function(payload) {

  switch(payload.action){
    case Constants.LOAD_SETTLEMENTS:
      console.log(payload);
      _settlements[payload.settlement.key()] = payload.settlement.val();
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  SettlementsStore.emitChange();

  return true;

});

export default SettlementsStore;