"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";
import QueryString    from '../utils/query_string';

var _settlements = {};
var previousSettlement = {};
var currentSettlement = {};

function updateCurrentSettlement(){
  var settlement = _.find(_settlements, (settle)=>(settle.name == currentSettlement.name));
  if(settlement) currentSettlement = settlement;
}

function getSettlementImIn(coords){
  var settlement = _.find(_settlements, (settle)=>{
    var latitude = (coords.latitude <= settle.nw_corner.lat && coords.latitude >= settle.se_corner.lat);
    var longitude = (coords.longitude <= settle.se_corner.lon && coords.latitude >= settle.nw_corner.lon);
    return longitude && latitude;
  });
  return settlement;
}

var SettlementsStore = {...StoreCommon, ...{
  settlements(){
    return _settlements;
  },
  currentSettlement(){
    return currentSettlement;
  }
}};

// Register callback with Dispatcher
Dispatcher.register(function(payload) {

  switch(payload.action){
    case Constants.LOAD_SETTLEMENTS:
      console.log(payload);
      _settlements = payload.settlement.val();
      if(currentSettlement != null){
        updateCurrentSettlement();
      }
      break;
    case Constants.CHECK_SETTLEMENT:
      previousSettlement = currentSettlement;
      currentSettlement = getSettlementImIn(payload.position.coords) || {};
      if(currentSettlement.name == previousSettlement.name){
        return true
      }
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  SettlementsStore.emitChange();

  return true;

});

export default SettlementsStore;