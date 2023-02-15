import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import userIcon from "../../../src/assets/images/user.svg";
import passIcon from "../../../src/assets/images/pass.svg";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { userServices } from "../../services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: "",
    };
  }

  refresh = () => {
    this.setState({
      username: "",
      password: "",
      loginError: "",
    });
  };

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = async () => {
    this.setState({ loginError: "" });
    try {
      let res = await userServices.handleLoginApi(
        this.state.username,
        this.state.password
      );
      if (res && res.errorCode !== 0) {
        this.setState({ loginError: res.message });
      }
      if (res && res.errorCode === 0) {
        this.props.userLoginSuccess(res.user);
        console.log("Login succeeds!");
        console.log("check log", this.props.isLoggedIn);
        if (res && res.user && res.user.roleId === "R1") {
          this.props.navigate("/system/company-manage");
        } else {
          this.props.navigate("/jobs");
        }
      }
      console.log("check account", res);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({ loginError: e.response.data.message });
        }
      }
    }
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };
  render() {
    const { username, password, loginError } = this.state;
    return (
      <div className="login-container align-self-center">
        <div className="login-header title">Login</div>
        <div className="login-body">
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              value={username}
              onChange={this.onUsernameChange}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              className="form-control"
              value={password}
              onChange={this.onPasswordChange}
              placeholder="Mật khẩu"
            />
          </div>
          {loginError !== "" && (
            <div className="login-error pb-2">
              <span className="login-error-message text-danger">
                {loginError}
              </span>
            </div>
          )}
          <div className="form-group">
            <div className="btn-form">
              <button
                className="btn btn-primary px-3"
                onClick={(e) => {
                  e.preventDefault();
                  this.handleLogin();
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    // userLoginFail: () => dispatch(actions.adminLoginFail())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
