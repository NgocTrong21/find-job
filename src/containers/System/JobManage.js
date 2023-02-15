import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import DatePicker from "../../components/Input/DatePicker";
import "react-markdown-editor-lite/lib/index.css";
import { userServices } from "../../services";

const JobManage = () => {
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState({});
  const [selectedJobGroup, setSelectedJobGroup] = useState({});
  const [jobGroup, setJobGroup] = useState([]);
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [date, setDate] = useState("");

  useEffect(async () => {
    try {
      let resCompany = await userServices.getCompanyById("ALL");
      let resJobType = await userServices.getAllCode("JOBTYPE");
      let resJobGroup = await userServices.getAllCode("JOBGROUP");
      if (resCompany && resCompany.errorCode === 0) {
        setCompanies(resCompany.data);
      }
      if (resJobType && resJobType.errorCode === 0) {
        setJobType(resJobType.data);
      }
      if (resJobGroup && resJobGroup.errorCode === 0) {
        setJobGroup(resJobGroup.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const buildData = (inputData, keyData) => {
    let listData = [];
    if (keyData === "JOBTYPE") {
      listData = inputData.map((item, index) => ({
        value: item.keyMap,
        label: item.valueVi,
      }));
    } else if (keyData === "JOBGROUP") {
      listData = inputData.map((item, index) => ({
        value: item.keyMap,
        label: item.valueVi,
      }));
    } else {
      listData = inputData.map((item, index) => ({
        value: item.id,
        label: item.companyName,
      }));
    }

    return listData;
  };

  const handleChange = (e) => {
    setSelectedCompany(e);
  };

  const handleEditorChange = ({ html, text }) => {
    setContentHTML(html);
    setContentMarkdown(text);
  };

  const handleSubmit = async () => {
    try {
      let res = await userServices.postNewJob({
        jobName: jobName,
        companyId: selectedCompany.value,
        dateExpiration: date,
        jobType: selectedJobType.value,
        jobGroup: selectedJobGroup.value,
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
      });
      if (res && res.errorCode === 0) {
        toast.success("Create new job succeed");
        handleResetData();
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      console.log(e);
    }
    console.log(
      "check state: ",
      jobName,
      selectedJobGroup,
      selectedJobType,
      selectedCompany,
      contentHTML,
      contentMarkdown,
      date
    );
  };

  const handleResetData = () => {
    setJobName("");
    setContentHTML("");
    setContentMarkdown("");
    setDate("");
    setSelectedCompany({});
    setSelectedJobGroup({});
    setSelectedJobType({});
  };

  const handleChangePicker = (selectedDate) => {
    setDate(new Date(selectedDate[0]).getTime());
  };

  return (
    <div className="job-manage-container">
      <div className="container">
        <div className="header">
          <div className="title">Quản lý việc làm</div>
        </div>
        <div className="body">
          <div className="form-group col-6 mb-3">
            <label>Chọn công ty</label>
            <Select
              value={selectedCompany}
              onChange={handleChange}
              options={buildData(companies)}
              placeholder="Chọn cong ty"
            />
          </div>
          <div className="row">
            <div className="form-group col-6 mb-3">
              <label>Tên công việc</label>
              <input
                type="text"
                className="form-control"
                value={jobName}
                onChange={(e) => {
                  setJobName(e.target.value);
                }}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <label>Chọn ngày kết thúc tuyển dụng</label>
              <DatePicker
                onChange={handleChangePicker}
                className="form-control"
                value={date}
                minDate={yesterday}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <label>Loại công việc</label>
              <Select
                value={selectedJobType}
                onChange={(e) => {
                  console.log("check e", e);
                  setSelectedJobType(e);
                }}
                options={buildData(jobType, "JOBTYPE")}
              />
            </div>
            <div className="form-group col-6 mb-3">
              <label>Nhóm công việc</label>
              <Select
                value={selectedJobGroup}
                onChange={(e) => {
                  setSelectedJobGroup(e);
                }}
                options={buildData(jobGroup, "JOBGROUP")}
              />
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "350px", marginBottom: "30px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={contentMarkdown}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary px-2" onClick={handleSubmit}>
              Lưu thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobManage;
