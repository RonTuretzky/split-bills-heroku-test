import React, { Component } from "react";
import "./home.css"
import { AuthContext } from "./../contexts/auth";
import home3 from './home3.png';
import home1 from './home1.png';
import home2 from './home2.png';
import home4 from './home4.jpg';
class Homse extends Component {
  static contextType = AuthContext;
  state = {};
  render() {
    return (
      <div className="row h-100 bg-success">
        <div className="col p-3 container">
          <h1 className="text-dark text-center">Meet-תל-חי</h1>
          <h3 className="text-center">
            לפגוש בקהילה הסטודנטיאלית - תל-חי ,<br></br>
          </h3>
            
          <h5 className="text-center">
            ימינה לדבר , שמאלה פחות<br></br>
          </h5>
        <div class="container">

            <div class="row mt-5">
              <div class="col-sm-6">
              <img src={home4} alt="" className="center"/>
              </div>
            </div>
        </div>
        <div class="container">
        <div class="row">
            <div class="row mt-5">
              <div class="col-sm-6">
              <img src={home3} alt="" className="center"/>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
        <div class="row">
            <div class="row mt-5">
              <div class="col-sm-6">
              <img src={home1} alt="" className="center"/>
              </div>
            </div>
        </div>
          </div>
        <div class="container">
        <div class="row">
            <div class="row mt-5">
              <div class="col-sm-6">
              <img src={home2} alt="" className="center"/>
              </div>
            </div>
        </div>
          </div>
         
            
         
          
        </div>
      </div>
    );
  }
}

export default Homse;
