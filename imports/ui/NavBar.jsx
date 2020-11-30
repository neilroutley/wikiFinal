import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { withTracker } from "meteor/react-meteor-data";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
      signup: false,
    };
  }

  onLogout() {
    Accounts.logout();
  }

  loginToggle() {
    if (this.state.signup) {
      this.setState({ login: !this.state.login, signup: !this.state.signup });
    } else {
      this.setState({ login: !this.state.login });
    }
  }

  signupToggle() {
    if (this.state.login) {
      this.setState({ login: !this.state.login, signup: !this.state.signup });
    } else {
      this.setState({ signup: !this.state.signup });
    }
  }

  render() {
    // console.log("NavBar state: ", this.state);
    // console.log("NavBar props: ", this.props);

    return (
      <div className="">
        <nav className="navbar navbar-expand-sm navbar-light">
          <div className="container">
            <NavLink className="font-weight-bold navbar-brand" to="/">
              <span className="font-weight-bold navbar-brand">
                Wiki Explorer
              </span>
            </NavLink>
            <div className="md-form my-0">
              {Meteor.user() ? (
                <span>
                  <Dropdown role="menu">
                    <Dropdown.Toggle
                      className="p-1 m-0"
                      id="dropdown-custom-1"
                      variant="outline-light"
                    >
                      <img
                        className="rounded"
                        height="30px"
                        width="30px"
                        src={`https://avatars.dicebear.com/api/human/${Meteor.users
                          .findOne(Meteor.userId())
                          .emails[0].address.toLowerCase()}.svg`}
                        alt={
                          Meteor.users.findOne(Meteor.userId()).emails[0]
                            .address
                        }
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu alignRight className="super-colors">
                      <LinkContainer to="/account">
                        <Dropdown.Item as="button" role="menuitem">
                          Account
                        </Dropdown.Item>
                      </LinkContainer>
                      <Dropdown.Item
                        as="button"
                        role="menuitem"
                        onClick={this.onLogout.bind(this)}
                      >
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              ) : (
                <div>
                  <button
                    className="btn btn-link"
                    key="loginKey"
                    alt="login button"
                    onClick={() => this.loginToggle()}
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-primary"
                    key="signupKey"
                    alt="signup button"
                    onClick={() => this.signupToggle()}
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
        {!Meteor.user() && (this.state.login || this.state.signup) ? (
          this.state.signup ? (
            <Signup />
          ) : (
            <Login />
          )
        ) : null}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user(),
  };
})(NavBar);
