"use strict";

import Constants   from   "../constants";
import Dispatcher  from   "../dispatcher";
import Api         from   "./api";

export default {

  toggleSideBar(){
    Dispatcher.dispatch({action: Constants.TOGGLE_SIDE_BAR});
  }

};