import React from "react";
import { Meteor } from "meteor/meteor";
import { Alert } from "reactstrap";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      email: "",
      password: "",
      redirectToHome: false
    };
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.state.email.trim();
    let password = this.state.password.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      if (err) {
        this.setState({ error: "Incorrect login" });
      } else {
        console.log(email, "login successful.");
      }
    });
  }

  render() {
    console.log("Login props: ", this.props);
    return (
      <div className="boxed-view text-center">
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error ? (
            <Alert color="danger">{this.state.error}</Alert>
          ) : (
            undefined
          )}

          <form
            onSubmit={this.onSubmit.bind(this)}
            className="boxed-view__form"
          >
            <input
              onChange={this.onChange.bind(this)}
              value={this.state.emailValue}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              onChange={this.onChange.bind(this)}
              value={this.state.passwordValue}
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="button btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

