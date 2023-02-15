import Login from "./Login";
import Register from "./Register";
import "./Account.scss";

const Account = () => {
  return (
    <div className="account-container d-flex justify-content-around w-100">
      <Register />
      <Login />
    </div>
  );
};

export default Account;
