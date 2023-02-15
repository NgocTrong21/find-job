import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as actions from "../../store/actions";
import "./HomeHeader.scss";

const HomeHeader = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let userInfor = useSelector((state) => state.user.userInfo);
  console.log("check user:", userInfor);
  let handleProcessLogout = () => {
    dispatch(actions.processLogout());
  };
  return (
    <div className="home-header-container">
      <div className="logo">Get Job</div>
      <div className="home-nav">
        <span
          className="text-nav"
          onClick={() => {
            history.push("/jobs");
          }}
        >
          Việc làm
        </span>
        <span
          className="text-nav"
          onClick={() => {
            history.push("/profile");
          }}
        >
          Hồ sơ
        </span>
        <span
          className="text-nav"
          onClick={() => {
            history.push("/companies");
          }}
        >
          Công ty
        </span>
      </div>
      <div className="profile">
        <i class="fas fa-bell"></i>
        <span className="text-profile">{`${userInfor.firstName} ${userInfor.lastName}`}</span>
        <i class="fas fa-sign-out-alt" onClick={handleProcessLogout}></i>
      </div>
    </div>
  );
};

export default HomeHeader;
