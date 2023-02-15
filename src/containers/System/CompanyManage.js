import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { userServices } from "../../services";
import CommonUtils from "../../utils/CommonUtils";
import Background from "../../assets/images/building-avatar.jpg";

class CompanyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: "",
      selectedProvince: "",
      companyName: "",
      address: "",
      contact: "",
      previewImage: "",
      valueImage: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    let res = await userServices.getAllCode("PROVINCE");
    if (res && res.errorCode === 0) {
      this.setState(
        {
          provinces: res.data,
        },
        () => {
          console.log("check pro:", this.state.provinces);
        }
      );
    }
  }

  handleChangeProvince = (e) => {
    this.setState({
      selectedProvince: e.target.value,
    });
  };

  handleSubmit = async () => {
    let res = await userServices.postNewCompany({
      companyName: this.state.companyName,
      address: this.state.address,
      provinceId: this.state.selectedProvince,
      contact: this.state.contact,
      image: this.state.avatar,
    });
    if (res && res.errorCode === 0) {
      toast.success("Create company succeed");
    } else {
      toast.error(res.message);
    }
  };

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let previewData = URL.createObjectURL(file);
      this.setState({
        previewImage: previewData,
        valueImage: e.target.value,
        avatar: base64,
      });
    }
  };

  render() {
    let { provinces, selectedProvince } = this.state;
    console.log("log state", this.state);
    return (
      <div className="company-manage-container">
        <div className="title">Quản lý công ty</div>
        <div className="body container d-flex justify-content-between">
          <div className="left-content col-6">
            <div className="form-group mb-3">
              <label>Tên công ty</label>
              <input
                className="form-control"
                onChange={(e) => {
                  this.setState({
                    companyName: e.target.value,
                  });
                }}
                value={this.state.companyName}
              />
            </div>
            <div className="form-group mb-3">
              <label>Địa chỉ</label>
              <input
                className="form-control"
                onChange={(e) => {
                  this.setState({
                    address: e.target.value,
                  });
                }}
                value={this.state.address}
              />
            </div>
            <div className="form-group mb-3">
              <label>Tỉnh thành</label>
              <select
                name="province"
                className="form-control"
                onChange={this.handleChangeProvince}
                value={selectedProvince}
              >
                {provinces &&
                  provinces.length > 0 &&
                  provinces.map((item, index) => (
                    <option key={index} value={item.keyMap}>
                      {item.valueVi}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group mb-2">
              <label>Email tuyển dụng</label>
              <input
                className="form-control"
                onChange={(e) => {
                  this.setState({
                    contact: e.target.value,
                  });
                }}
                value={this.state.contact}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary px-3"
                onClick={this.handleSubmit}
              >
                Lưu thông tin
              </button>
            </div>
          </div>
          <div className="right-content col-3 text-center">
            <div className="title-image">Ảnh đại diện</div>
            <label htmlFor="userImage">
              <div
                className="preview-image"
                style={{
                  height: "200px",
                  width: "200px",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  cursor: "pointer",
                  backgroundImage: `url(${
                    this.state.previewImage
                      ? this.state.previewImage
                      : Background
                  })`,
                }}
              ></div>
            </label>
            <input
              id="userImage"
              name="user-image"
              type="file"
              hidden
              value={this.state.valueImage}
              onChange={(e) => this.handleOnChangeImage(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyManage);
