import { data } from "jquery";
import React, { Component } from "react";
import { AuthContext } from "./../contexts/auth";
import splitBillService from "../services/SplitBillService";

class AddExpence extends Component {
  static contextType = AuthContext;

  state = {
    expense: { title: "", sum: 0, category: "", date: 0 },
  };

  handleChange = (e) => {
    const account = { ...this.state.expense };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, sum, category, date } = this.state.expense;
    try {
      await splitBillService.AddExpence(title, sum, category, date);
    } catch (err) {
      this.setState({ errors: { page: "wrong email/password" } });
      console.log(err);
      return; //handle error
    }
  };

  render() {
    return (
      <form
        className="border border-dark bg-info p-3"
        onSubmit={this.handleSubmit}
      >
        <div className="form-inline">
          <div className="form-control-md p-2">
            <input
              type="text"
              className=" -control"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              id="title"
              name="title"
            />
          </div>
          <div className="form-control-md p-2">
            <input
              type="text"
              className="Sum"
              placeholder="$"
              value={this.state.sum}
              onChange={this.handleChange}
              id="sum"
              name="sum"
            />
          </div>
          <div className="form-control-md p-2">
            <select
              className="custom-select my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              value={this.state.category}
              onChange={this.handleChange}
              name="category"
            >
              <option>Category...</option>
              <option>Grocerirs</option>
              <option>Bills</option>
              <option>Others</option>
            </select>
          </div>
          <div className="form-control-md p-2">
            <input
              type="date"
              className="form-control"
              value={this.state.date}
              onChange={this.handleChange}
              name="date"
            />
          </div>
          <div className="form-group p-2 ">
            <button className="btn  btn-secondary -sm">Add expense</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AddExpence;
