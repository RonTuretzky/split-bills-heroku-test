import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./../contexts/auth";

class NavBar extends Component {
  static contextType = AuthContext;

  handleLogOut = () => {
    this.context.signout();
  };

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark text-light bg-success -sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Meet-תל-חי
          </NavLink>
          {this.context.currentUser && (
            <NavLink className="navbar-brand" to="/matches">
              לדבר
            </NavLink>
          )}
          {this.context.currentUser && (
            <NavLink className="navbar-brand" to="/meet">
              לפגוש
            </NavLink>
          )}
          {this.context.currentUser && (
            <div className="d-flex ml-auto">
              <span className="navbar-text mx-2">
                 {this.context.currentUser.userName} שלום
              </span>
              <div>
                <button
                  className="btn btn-success my-2 my-sm-0 "
                  onClick={this.handleLogOut} 
                >
                  התנתק
                </button>
              </div>
            </div>
          )}
          {!this.context.currentUser && (
            <NavLink className="navbar-brand" to="/login">
              התחברות
            </NavLink>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
