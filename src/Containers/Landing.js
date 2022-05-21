import React, { Component } from "react";
import Emailsubmit from "../Components/UI/Emailsubmit/Emailsubmit";
import classes from "./Landing.module.css";

class Landing extends Component {
  render() {
    return (
      <div className={classes.contentwrapper}>
        <div className={classes.firstcol}>
          <div>
            <h1 className={classes.heading}>Restaurant recommend system</h1>
          </div>

          <div className={classes.emailbox}>
            <Emailsubmit />
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
