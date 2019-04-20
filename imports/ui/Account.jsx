import React from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar.jsx";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { UserHistory } from "../api/methods.js";

class Account extends React.Component {
  
  renderHistory() {
    return this.props.hist.map((p) => (
      <button className="btn btn-primary" key={p._id} alt={p.text}>
        {p.text}
      </button>
    ));
  }

  render() {
    console.log("Account props: ", this.props);
    console.log("Account state: ", this.state);

    return (
      <div className="container">
        <NavBar />
        <div>
          <h1 className="text-center">Full Search History</h1>
        </div>
        <div className="links">{this.renderHistory()}</div>
      </div>
    );
  }
}

Account.propTypes = {
  hist: PropTypes.arrayOf(PropTypes.object)
};

export default withTracker(() => {
  Meteor.subscribe("hist");

  return {
    hist: UserHistory.find({}, { sort: { createdAt: 1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(Account);
