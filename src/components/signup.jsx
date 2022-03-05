import React, { Component } from "react";
import { AuthContext } from "../contexts/auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  static contextType = AuthContext;
  state = {
    account: { name: "",gender: "", attract_to:"", email: "", password1: "", password2: "" },
    errors: {},
    apiError: null,
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.name.trim() === "") {
      errors.name = "Name is requierd.";
    }

    if (account.gender.trim() === "") {
      errors.gender = "gender is requierd.";
    }

    if (account.attract_to.trim() === "") {
      errors.attract_to = "attraction is requierd.";
    }

    if (account.email.trim() === "") {
      errors.email = "email is requierd.";
    }

    if (account.password1.trim() === "") {
      errors.password1 = "Password is requierd.";
    } else if (!this.isStrongPassword(account.password1.trim())) {
      errors.password1 = "Password is weak";
    }

    if (account.password2.trim() === "") {
      errors.password2 = "Password validation is requierd.";
    } else if (account.password1.trim() !== account.password2.trim()) {
      errors.password2 = "Password do not match.";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = async (e) => {
    console.log("Beginning registration process")
    e.preventDefault();
    const { name, gender,attract_to,email, password1 } = this.state.account;
    const errors = this.validate();
    console.log("Sucessfully validated registration details")
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await this.context.register(name,gender,attract_to, email, password1);
    } catch (err) {
      this.setState({
        apiError: "somthing went wrong- try filling all the fileds",
      });
      console.log(err);
      return;
    }
    console.log("Moving to /Matches page")
    this.props.history.push("/Matches");
  };

  isStrongPassword(password) {
    let regex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

    return regex.test(password);
  }

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
            className="py-1 border rounded p-2 bg-danger"
            onSubmit={this.handleSubmit}
          >
            <div className="form-match">
              <input
                value={account.name}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Name *"
              ></input>
              {errors.name && (
                <div className="alert alert-danger mt-2 p-0">{errors.name}</div>
              )}
            </div>
            {/* girl - boy - other */}
            <div className="form-match">
              <input
                value={account.gender}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                placeholder="Gender *"
              ></input>
              {errors.gender && (
                <div className="alert alert-danger mt-2 p-0">{errors.gender}</div>
              )}
            </div>
            {/* straight - gay - B */}
            <div className="form-match">
              <input
                value={account.attract_to}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="attract_to"
                name="attract_to"
                placeholder="Sex. orientation *"
              ></input>
              {errors.attract_to && (
                <div className="alert alert-danger mt-2 p-0">{errors.attract_to}</div>
              )}
            </div>

            <div className="form-match">
              <input
                value={account.email}
                onChange={this.handleChange}
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email *"
              ></input>
              {errors.email && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="input-match mb-3">
              <input
                value={account.password1}
                onChange={this.handleChange}
                type="password"
                className="form-control"
                id="password"
                name="password1"
                placeholder="Password *"
              ></input>
              {/* explain password rules */}
              <button
                type="button"
                className="btn btn-secondary"
                data-toggle="tooltip"
                data-placement="top"
                title=" Your password must be 8-20 characters long, contain
                        lowercase and uppercase letters, numbers and special
                        characters."
              >
                ?
              </button>
              {errors.password1 && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.password1}
                </div>
              )}
            </div>
            <div className="form-match">
              <input
                value={account.password2}
                onChange={this.handleChange}
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                placeholder="Re type password *"
              ></input>
              {errors.password2 && (
                <div className="alert alert-danger mt-2 p-0">
                  {errors.password2}
                </div>
              )}
            </div>
            <button
              type="submit"
              id="button-submit"
              className="btn btn-secondary"
            >
              Register
            </button>
            {errors.password2 && (
              <div className="alert alert-danger mt-2 p-0">
                {errors.password2}
              </div>
            )}
            <p className="small mt-2 mb-1">
              already have a user?
              <Link to="/login" className="text-white ">
                {" "}
                Login
              </Link>
            </p>
            {this.state.apiError && (
              <div className="alert alert-danger">
                <pre>
                  <code>{this.state.apiError}</code>
                </pre>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
