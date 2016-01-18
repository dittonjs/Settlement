"use strict";

import React              from 'react';
import NavigationActions  from '../../actions/navigation';
import history            from '../../history';
export default class SideBar extends React.Component{
  getStyles(){
    return {
      sideBar: {
        position: "fixed",
        top: "0px",
        left: this.props.sideBarOpen ? "0px" : "-240px",
        bottom: "0px",
        backgroundColor: "white",
        zIndex: "10",
        width: "240px",
        transition: "all .5s ease",
        boxShadow: "5px 5px 5px rgb(48,60,75)" 
      },
      title: {
        float: "right",
        marginLeft: "10px"
      },
      currentPage: {
        marginLeft: "10"
      },
      icon: {
        marginRight: "5px",
        color: "rgb(48,60,75)"
      },
      header: {
        padding: "20px",
        backgroundColor: "rgb(142,156,175)"
      },
      menu: {
        padding: "20px",
        borderBottom: "1px solid grey"
      }
    }
  }
  transition(url){
    history.pushState(null, "/"+url);
    NavigationActions.toggleSideBar();
  }
  render(){
    var styles = this.getStyles();
    console.log(this.props.sideBarOpen);
    return  <div style={styles.sideBar}>
              <div style={styles.header}>
                Menu
              </div>
              <div onClick={e=>this.transition("game/user_info")}style={styles.menu}>
                <i className="glyphicon glyphicon-user" style={styles.icon}></i>User Info
              </div>
              <div onClick={e=>this.transition("game/current_settlement")} style={styles.menu}>
                <i className="glyphicon glyphicon-tower" style={styles.icon}></i>Current Settlement
              </div>
              <div onClick={e=>this.transition("game/game_map")} style={styles.menu}>
                <i className="glyphicon glyphicon-road" style={styles.icon}></i>Game Map
              </div>
              <div onClick={e=>this.transition("login")} style={styles.menu}>
                <i className="glyphicon glyphicon-log-out" style={styles.icon}></i>Logout
              </div>
            </div>;
  }
};