"use strict";

import React from 'react';
import NavigationActions from '../../actions/navigation';
export default class NavBar extends React.Component{
  getStyles(){
    return {
      nav: {
        position: "fixed",
        top: "0px",
        left: "0px",
        padding: "20px 20px 20px 30px",
        backgroundColor: "rgb(48,60,75)",
        color: "white",
        width: "100%",
      },
      title: {
        float: "right",
        marginLeft: "10px"
      },
      currentPage: {
        marginLeft: "10"
      },
      icon: {
        position: "absolute",
        top: "23px",
        left: this.props.sideBarOpen ? "250px" : "20px",
        transition: "all .5s ease" 
      }
    }
  }
  getCurrentPage(url){
    if(url.indexOf("user_info") > -1) return "User Info";
    if(url.indexOf("game_map") > -1) return "Game Map";
    if(url.indexOf("current_settlement") > -1) return "Current Settlement";
    return "";
  }
  toggleSideBar(){
    console.log("called");
    NavigationActions.toggleSideBar();
  }
  render(){
    var styles = this.getStyles();

    return <div style={styles.nav}>
      <i onClick={e=>this.toggleSideBar()}style={styles.icon} className="glyphicon glyphicon-menu-hamburger"></i>
      <span style={styles.currentPage}>{this.getCurrentPage(window.location.href)}</span>
      <span style={styles.title}>Settlements</span>
    </div>;
  }
};