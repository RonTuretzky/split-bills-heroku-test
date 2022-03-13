import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class Login extends Component {
  static contextType = AuthContext;
  state = {
    account: { email: "", password: "" },
    errors: {},
    apiError: null,
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.email.trim() === "") {
      errors.email = "email is requierd.";
    }

    if (account.password.trim() === "") {
      errors.password = "Password is requierd.";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state.account;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await this.context.login(email, password);
    } catch (err) {
      this.setState({
        apiError: "משהו השתבש, נסו שנית",
      });
      console.log(err);
      return;
    }
    this.props.history.push("/meet"); 
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div className="row pt-5">
        <div className="col-12 offset-md-4 col-md-4 mt-1 justify-content-center">
          <form
            className="py-1 border rounded p-2 bg-success"
            onSubmit={this.handleSubmit}
          >
            <div className="form-match">
              <input
                value={account.email}
                onChange={this.handleChange}
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="* אימייל"
              ></input>
              {errors.email && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-match">
              <input
                value={account.password}
                onChange={this.handleChange}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="* סיסמא"
              ></input>
              {errors.password && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.password}
                </div>
              )}
            </div>
            <br></br>
            <button
              type="submit"
              id="button-submit"
              className="btn btn-success border"
            >
              התחברות
            </button>
            <p className="small mt-2 mb-1">
              אין לך משתמש?
              <Link to="/signup" className="text-white border">
                {" "}
                הרשמה 
              </Link>
            </p>
            {this.state.apiError && (
              <div className="alert alert-danger">{this.state.apiError}</div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
