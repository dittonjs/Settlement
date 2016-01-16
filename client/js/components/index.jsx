"use strict";

import React          from "react";

export default class Index extends React.Component {

  render(){
    var styles = {
      mainApp: {
      }
    }
    return (
      <div style={styles.mainApp}>
        <h1>Settlements</h1>
        {this.props.children}
        <div className="footer">
          <p>
            Built by <a href="http://www.atomicjolt.com">Joseph Ditton</a>.
          </p>
        </div>
      </div>
    );
  }

}
