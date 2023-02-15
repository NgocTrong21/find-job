import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userServices } from "../../services";
import * as actions from "../../store/actions";
import "./Register.scss";

const Register = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchGenderStart());
  }, [dispatch]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { genders } = useSelector((state) => state.admin);

  useEffect(() => {
    setGender(genders && genders.length > 0 ? genders[0].keyMap : "");
  }, [genders]);

  const resetData = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setGender(genders && genders.length > 0 ? genders[0].keyMap : "");
    setPassword("");
    setPhoneNumber("");
  };

  const handleRegister = async () => {
    try {
      let res = await userServices.getPostNewUser({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        gender: gender,
        role: "R3",
      });
      if (res && res.errorCode === 0) {
        resetData();
        toast.success("Create a new user success!");
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="register-container align-self-center">
      <div className="login-header title">Đăng ký</div>
      <div className="login-body">
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Mật khẩu"
          />
        </div>
        <div className="form-group">
          <label>Họ</label>
          <input
            className="form-control"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="Họ"
          />
        </div>
        <div className="form-group">
          <label>Tên</label>
          <input
            className="form-control"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Tên"
          />
        </div>
        <div className="form-group">
          <label>Giới tính</label>
          <select
            name="gender"
            className="form-control"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            value={gender}
          >
            {genders &&
              genders.length > 0 &&
              genders.map((item, index) => (
                <option key={index} value={item.keyMap}>
                  {item.valueVi}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            className="form-control"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            placeholder="Số điện thoại"
          />
        </div>
        <div className="form-group">
          <div className="btn-form">
            <button
              className="btn btn-primary px-3"
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
