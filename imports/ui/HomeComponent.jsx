import React, { Component } from "react";
import PropTypes from "prop-types";
import NavBar from "./NavBar.jsx";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { UserHistory } from "../api/methods.js";

class HomeComponent extends Component {
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

  searchQuery(e) {
    e.preventDefault();
    var searchText = document.getElementById("search").value;
    document.getElementById("search").value = "";
    if (searchText.length > 0) {
      this.callApi(searchText);
    }
  }

  callApi(query, index = -1) {
    Meteor.call("getData", query, (err, data) => {
      if (err) {
        this.setState = {
          err: err
        };
        return;
      }
      console.log("data: ", data);

      let newHist = [...this.state.history, query];
      if (index > -1) {
        newHist = [...this.state.history.splice(0, index + 1)];
      }
      this.setState({
        title: data.title,
        content: data.text,
        links: data.links,
        history: newHist
      });
    });
    if (Meteor.user()) {
      Meteor.call("hist.insert", query);
    }
  }

  renderHistory() {
    return this.state.history.map((p, i) => (
      <button
        className="btn btn-primary"
        key={i}
        alt={p}
        onClick={() => {
          this.callApi(p, i);
        }}
      >
        {p}
      </button>
    ));
  }

  renderLinks() {
    return this.state.links.slice(0, 100).map((p, i) => (
      <button
        className="btn btn-primary"
        key={i}
        alt={p["*"]}
        onClick={() => this.callApi(p["*"])}
      >
        {p["*"]}
      </button>
    ));
  }

  renderContent() {
    return (
      <span dangerouslySetInnerHTML={{ __html: this.state.content["*"] }} />
    );
  }

  loadUserHistory() {
    console.log("Trying to load");
    this.setState({ history: this.props.hist.map(a => a.text) });
  }

  render() {
    console.log("HC props: ", this.props);
    console.log("HC state: ", this.state);

    return (
      <div className="container">
        <NavBar />
        <form
          onSubmit={this.searchQuery.bind(this)}
          className="search-field text-center"
        >
          <div className="globeContainer">
            <img
              src="/1024px-Wikipedia_svg_logo.svg.png"
              alt="wikipedia logo svg"
              className="globe"
            />
          </div>
          <input
            id="search"
            className=""
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>
        <div>
          <div>
            <h2>History</h2>
            {Meteor.user() ? (
              <button
                className="btn btn-secondary"
                onClick={() => this.loadUserHistory()}
              >
                Load Hist
              </button>
            ) : null}
          </div>
          <div className="links">{this.renderHistory()}</div>
        </div>
        <div>
          <h2>Links</h2>
          <div className="links">{this.renderLinks()}</div>
        </div>

        <div>
          <h2>Content : {this.state.title}</h2>
          <div className="content">{this.renderContent()}</div>
        </div>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  hist: PropTypes.arrayOf(PropTypes.object)
};

export default withTracker(() => {
  Meteor.subscribe("hist");

  return {
    hist: UserHistory.find({}, { sort: { createdAt: 1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(HomeComponent);
