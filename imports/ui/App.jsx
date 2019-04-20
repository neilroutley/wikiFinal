import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import HomeComponent from "./HomeComponent";
import Account from "./Account";

import "../api/methods";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: "",
      title: "",
      content: "",
      links: [],
      history: []
    };
  }

  render() {
    // console.log("App props: ", this.props);
    // console.log("App state: ", this.state);
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/account" component={Account} />
        </Switch>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);
