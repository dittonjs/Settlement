"use strict";

import React from 'react';
import _     from 'lodash';
export default class UserInfo extends React.Component{
  constructor(){
    super();
    this.state = {};
    this.state.tabName="User Info";
    this.state.invTabName="Apparel";
  }
  getStyles(){
    return {
      container: {
        border: "1px solid black",
        borderRadius: "2px",
        padding: "20px",
        boxShadow: "5px 5px 5px #888888",
        position: "relative"
      },
      tabs: {
        position: "absolute",
        top: "0px",
        left: "15px",
        width: "100%",
        borderBottom: "1px solid black",
      },
      invTabs: {
        position: "absolute",
        top: "0px",
        left: "15px",
        width: "100%",
        borderBottom: "1px solid black",
      },
      tab: {
        padding: "10px",
        //display: "inline-block",
        borderRight: "1px solid black"
      },
      invTab: {
        //width: "50px",
        padding: "10px",
        //display: "inline-block",
        borderRight: "1px solid black"
      },
      userInfo: {
        marginTop: "50px",
        height: "250px",
        border: "1px solid black",
        width: "100%",
        position: "relative"
      },
      label: {
        padding: "5px"
      },
      stats: {
        border: "1px solid black",
        width: "150px",
        marginLeft: "5px"
      },
      list: {
        marginTop: "50px",
      }
    }
  }

  changeTab(tab){
    this.setState({tabName: tab});
  }

  changeInvTab(tab){
    this.setState({invTabName: tab});
  }

  displayItem(item){

  }

  getInvList(tab, inventory, styles){
    var data;
    if(tab == "Apparel") data = inventory.apparel;
    if(tab == "Weapons") data = inventory.weapons;
    if(tab == "Usables") data = inventory.usable;
    if(tab == "Other")   data = inventory.other;
    return _.map(data, (item)=>{
      return <div style={styles.label} onClick={()=>{this.displayItem(item)}}>{item.name}</div>
    });
  }

  getUserInfo(userInfo, styles){
    return <div className="row" style={styles.userInfo}>
              <div className="col-md-4 col-sm-12 col-xs-12 col-lg-4 col-xl-4">
                <div style={styles.label}>Name: {userInfo.name}</div>
                <div style={styles.label}>Exp: {userInfo.exp} / {userInfo.to_next_level}</div>
                <div style={styles.label}>Money: ${userInfo.money}</div>
                <div style={styles.label}>Stats</div>
                <div style={styles.stats}>
                  <div style={styles.label}>Health: {userInfo.health}</div>
                  <div style={styles.label}>Strength: {userInfo.strength}</div>
                  <div style={styles.label}>Defense: {userInfo.defense}</div>
                  <div style={styles.label}>Intelligence: {userInfo.intelligence}</div>
                </div>
              </div>
            </div>
  }

  getMyBases(bases, styles){
    var bases = _.map(bases.baseData, (data)=>{
                return <div style={styles.label}>{data.name}</div>
              });
    if(!bases.length) bases = <div>{"You don't belong to any settlements"}</div>
    return <div style={styles.userInfo}>
              {bases}
            </div>
  }

  getInventory(inventory, styles){
    var tabs = _.map(["Apparel", "Weapons", "Usables", "Other"], (tab)=>{
      var style={};
      if(tab == this.state.invTabName) style.backgroundColor = "grey";
      return <div className="col-sm-3 col-xs-3" key={"inventory_"+tab} style={{...styles.invTab, ...style}} onClick={()=>this.changeInvTab(tab)}>{tab}</div>
    });
    return <div style={styles.userInfo}>
              <div className="row" style={styles.invTabs}>
                {tabs}
              </div>
              <div style={styles.list}>
                {this.getInvList(this.state.invTabName, inventory, styles)}
              </div>
            </div>
  }
  render(){
    if(!this.props.userData) return <div />;
    var styles = this.getStyles();
    console.log(this.props.userData);
    var content;

    if(this.state.tabName=="User Info"){
      content = this.getUserInfo(this.props.userData, styles);
    } else if(this.state.tabName=="Settlements"){
      content = this.getMyBases(this.props.userData.bases_belonged_to, styles);
    } else {
      content = this.getInventory(this.props.userData.inventory, styles);
    }
 
    var tabs = _.map(["User Info", "Settlements", "Inventory"], (tab)=>{
      var style={};
      if(tab == this.state.tabName) style.backgroundColor = "grey";
      return <div className="col-sm-4 col-xs-4"key={"user_info_"+tab} style={{...styles.tab, ...style}} onClick={()=>this.changeTab(tab)}>{tab}</div>
    }); 
    return  <div style={styles.container}>
              <div className="row" style={styles.tabs}>
                {tabs}
              </div>
              {content}
            </div>;
  }
};