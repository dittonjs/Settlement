"use strict";

import Constants   from   "../constants";
import Dispatcher  from   "../dispatcher";
import Api         from   "./api";

export default {
  loadUserData(data){
    Dispatcher.dispatch({action: Constants.LOAD_USER_DATA, data});
  }
};