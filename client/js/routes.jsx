"use strict";

import React                  from 'react';
import { Route, IndexRoute }  from 'react-router';
import Index                  from './components/index';
import UserInfo               from './components/main/user_info';
import NotFound               from './components/not_found';
import Login                  from './components/main/login';
import SignUp                 from './components/main/sign_up';
import GameMap                from './components/main/game_map';
import GameController         from './components/main/game_controller'
import Settlement             from './components/main/settlement';

export default (
  <Route path="/" component={Index}>
    <IndexRoute component={GameController}/>
    <Route path="game" component={GameController}>
      <Route path="user_info" component={UserInfo}/>
      <Route path="current_settlement" component={Settlement}/>
      <Route path="game_map" component={GameMap}/>
    </Route>
    <Route path="login" component={Login}/>
    <Route path="sign_up" component={SignUp}/>
    <Route path="*" component={NotFound}/>
  </Route>
);