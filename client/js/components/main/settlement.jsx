"use strict";

import React from 'react';

export default class Settlement extends React.Component{
  constructor(props){
    super();
    this.state = {};
    this.state.position = null;
    this.timeOut = -1;
  }

  startGeoLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.setState({position});
    });
    this.timeOut = setTimeout(()=>{this.startGeoLocation()}, 5000);
  }

  componentWillUnmount(){
    clearTimeout(this.timeOut)
  }

  componentDidMount(){
    if(navigator.geolocation){
      this.startGeoLocation();
    }
  }
  render(){

    if(!this.state.position) return <div />
    console.log(this.state.position);
    return  <div>
              <h2>Settlement</h2>
              <h2>Lat: {this.state.position.coords.latitude} Long: {this.state.position.coords.longitude}</h2>
            </div>
  }

};