"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import QueryString    from '../utils/query_string';

var _userData = null;

var UserDataStore = {...StoreCommon, ...{
  userData(){
    return _userData;
  }
}};

// Register callback with Dispatcher
Dispatcher.register(function(payload) {

  switch(payload.action){
    case Constants.LOAD_USER_DATA:
      console.log(payload);
      _userData = payload.data;
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  UserDataStore.emitChange();

  return true;

});

export default UserDataStore;