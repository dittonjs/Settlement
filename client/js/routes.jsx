"use strict";

import React                  from 'react';
import { Route, IndexRoute }  from 'react-router';
import Index                  from './components/index';
import Home                   from './components/main/home';
import NotFound               from './components/not_found';
import Login                  from './components/main/login';
import SignUp                  from './components/main/sign_up';
export default (
  <Route path="/" component={Index}>
    <IndexRoute component={Home}/>
    <Route path="login" component={Login}/>
    <Route path="sign_up" component={SignUp}/>
    <Route path="*" component={NotFound}/>
  </Route>
);