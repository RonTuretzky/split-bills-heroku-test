import React, { Component } from "react";
import { AuthContext } from "../contexts/auth";
import { Link } from "react-router-dom";

class Signup extends Component {
  static contextType = AuthContext;
  state = {
    account: { name: "",profile_pic: "",phone_number:"", email: "", password1: "", password2: "" },
    errors: {},
    apiError: null,
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.name.trim() === "") {
      errors.name = "שם דרוש";
    }
    if (account.profile_string.trim() === "") {
      errors.name = "פרופיל דרוש";
    }

    if (account.profile_pic.trim() === "") {
      errors.profile_pic = "דרושה תמונת פרופיל";
    }



    if (account.phone_number.trim() === "") {
      errors.phone_number = "מספר טלפון דרוש";
    }

    if(account.phone_number.length !== 10){
      errors.phone_number = "הוזן מספר טלפון לא חוקי";
    }

    if (account.email.trim() === "") {
      errors.email = "אימייל דרוש";
    }

    if (account.password1.trim() === "") {
      errors.password1 = "סיסמא דרושה";
    } else if (!this.isStrongPassword(account.password1.trim())) {
      errors.password1 = "סיסמא חלשה";
    }

    if (account.password2.trim() === "") {
      errors.password2 = "אנא הקש סיסמא שנית.";
    } else if (account.password1.trim() !== account.password2.trim()) {
      errors.password2 = "הסיסמאות לא תואמות";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, profile_pic,profile_string ,yeechor,phone_number,email, password1 ,password2} = this.state.account;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    try {
      await this.context.register(name, profile_pic,profile_string ,yeechor,phone_number,email, password1);
    } catch (err) {
      this.setState({
        apiError: "משהו השתבש, נסו שוב",
      });
      console.log(err);
      return;
    }
    this.props.history.push("/meet");
  };

  isStrongPassword(password) {
    let regex =
      /^(?=.*[0-9])(?=.*)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,20}$/;

    return regex.test(password);
  }
  handleChangeyeechor = (e) => {
    let value = e.currentTarget.checked
    const account = { ...this.state.account };
    account['yeechor']=value; 
    this.setState({ account });
  };
  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  
  handleChangePic=(e)=>{
    let srcImg = "derp";
    const comp = this; 
    var img = document.querySelector('input[type=file]')['files'][0];
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      }
      reader.readAsDataURL(img);
    });
    
    promise.then(img => {
      comp.srcImg = img;
      const account = { ...this.state.account };
      account.profile_pic = img
      this.setState({ account });
    });
    
   
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
                value={account.name}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="*שם"
              ></input>
              {errors.name && (
                <div className="alert alert-danger mt-2 p-0">{errors.name}</div>
              )}
            </div>
            <p class="text-white">תמונה</p>
            <div className="form-match">
              <input
                // value={account.profile_pic}
                onChange={this.handleChangePic}
                type="file"
                className="form-control"
                id="profile_pic"
                name="profile_pic"
                accept="image/png, image/jpeg, image/jpg"
                placeholder="profile picture *"
              ></input>
              {errors.profile_pic && (
                <div className="alert alert-danger mt-2 p-0">{errors.profile_pic}</div>
              )}
            </div>

            <div className="form-match">
              <input
                value={account.phone_number}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="phone_number"
                name="phone_number"
                placeholder="*מספר טלפון"
              ></input>
              {errors.phone_number && (
                <div className="alert alert-danger mt-2 p-0">{errors.phone_number}</div>
              )}
            </div>
            
            <div className="form-match">
              <textarea
                value={account.profile_string}
                onChange={this.handleChange}
                type="text"
                className="form-control"
                id="profile_string"
                name="profile_string"
                placeholder=" הפרופיל שלך: פרטים אישיים עלייך
                אנא לציין כאן העדפה לקשר חברי\העדפה מינית במידת הצורך"
              ></textarea>
              {errors.profile_string && (
                <div className="alert alert-danger mt-2 p-0">{errors.profile_string}</div>
              )}
            </div>
            <div className="form-match">
              <label>
             <input 
             type="checkbox"
             checked = {account.yeechor}
             onChange={this.handleChangeyeechor}
             >
             
             </input>
             ?מייחר.ת
              </label>

              
              
              {errors.yeechor && (
                <div className="alert alert-danger mt-2 p-0">{errors.yeechor}</div>
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
                placeholder="*אימייל"
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
                placeholder="*סיסמא"
              ></input>
              {/* explain password rules */}
              <button
                type="button"
                className="btn btn-secondary"
                data-toggle="tooltip"
                data-placement="top"
                title=" הסיסמא צריכה להיות בין 6-20 תווים באנגלית, עם לפחות תו
                גדול אחד,ומספר "
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
                placeholder="*הקש.י סיסמא שוב"
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
              className="btn btn-success border"
            >
              הרשמה
            </button>
            {errors.password2 && (
              <div className="alert alert-danger mt-2 p-0">
                {errors.password2}
              </div>
            )}
            <p className="small mt-2 mb-1 text-white">
              כבר יש לך משתמש?
              <Link to="/login" className="text-white border">
                {" "}
                התחברות
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
