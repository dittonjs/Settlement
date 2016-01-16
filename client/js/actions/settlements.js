"use strict";

import Constants   from   "../constants";
import Dispatcher  from   "../dispatcher";
import Api         from   "./api";

export default {
  updateSettlement(id){

  },
  loadSettlement(settlement){
    Dispatcher.dispatch({action: Constants.LOAD_SETTLEMENTS, settlement});
  }
};