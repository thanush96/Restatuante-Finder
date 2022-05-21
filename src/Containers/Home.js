import React, { Component } from "react";
import classes from "./Home.module.css";
import { Route, Link } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import List from "./List";
import Update from "./Update";
import Admin from "../Components/Admin";
import { getAuth, signOut } from "firebase/auth";
import Spinner from "../Components/Spinner/Spinner";

class Home extends Component {
  state = {
    overlaywidth: 0,
    user: false,
    loading: true,
  };

  componentDidMount() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({ user: true, loading: false });
      }
      this.setState({ loading: false });
    });
  }

  openOverlay = () => {
    this.setState({ overlaywidth: 100 });
  };
  closeOverlay = () => {
    this.setState({ overlaywidth: 0 });
  };

  logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Sign-out successful");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
        alert("Sign-out unsuccessful");
      });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        <div
          style={{ width: this.state.overlaywidth + "%" }}
          className={classes.overlay}
        >
          <span className={classes.closebtn} onClick={this.closeOverlay}>
            &times;
          </span>
          <div className={classes.overlaycontent}>
            <ul>
              <li onClick={this.closeOverlay}>
                <Link to="/home">Home</Link>
              </li>
              <li onClick={this.closeOverlay}>
                <Link to="/admin">Admin</Link>
              </li>

              {this.state.user ? (
                <li onClick={this.closeOverlay}>
                  <Link to="/#">signOut</Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className={classes.Container}>
          <div fluid className={classes.navbarcontainer}>
            <div className={classes.logocol}>
              <Link to="#">
                <h5>Restaurants Recommendation System</h5>
              </Link>
            </div>
            <div className={classes.navlist}>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>

                {this.state.user ? (
                  <li onClick={this.logout}>
                    <Link to="/#" on>
                      signOut
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
            <span className={classes.hamburger} onClick={this.openOverlay}>
              &#9776;
            </span>
          </div>

          {this.state.user ? (
            <div className={classes.contentcontainer}>
              <Route path="/home" exact render={() => <Dashboard />} />
              <Route path="/admin" exact render={() => <Admin />} />
              <Route path="/list" exact render={() => <List />} />
              <Route path="/update/:id" exact render={() => <Update />} />
              <Route path="/" exact render={() => <Dashboard />} />
            </div>
          ) : (
            <div className={classes.contentcontainer}>
              <Route path="*" exact render={() => <Landing />} />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
