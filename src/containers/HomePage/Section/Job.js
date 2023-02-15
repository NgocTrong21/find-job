import "./Job.scss";
import { useEffect, useState } from "react";
import CustomScrollbars from "../../../components/CustomScrollbars";
import HomeHeader from "../../Header/HomeHeader";
import Background from "../../../assets/images/building-avatar.jpg";
import { userServices } from "../../../services";
import moment from "moment";
import { useHistory } from "react-router";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobGroups, setJobGroups] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedJobGroup, setSelectedJobGroup] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  let history = useHistory();

  useEffect(async () => {
    try {
      let res = await userServices.getJobById("ALL");
      let resJobType = await userServices.getAllCode("JOBTYPE");
      let resJobGroup = await userServices.getAllCode("JOBGROUP");
      let resProvince = await userServices.getAllCode("PROVINCE");
      if (
        res.errorCode === 0 &&
        resJobGroup.errorCode === 0 &&
        resJobType.errorCode === 0 &&
        resProvince.errorCode === 0
      ) {
        setJobs(res.data);
        setJobGroups(resJobGroup.data);
        setJobTypes(resJobType.data);
        setProvinces(resProvince.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(async () => {
    try {
      let res = await userServices.searchJob({
        jobType: selectedJobType,
        jobGroup: selectedJobGroup,
      });

      if (res && res.errorCode === 0) {
        setJobs(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, [selectedJobGroup, selectedJobType, selectedProvince]);

  console.log("check jos:", jobs);
  return (
    <>
      <CustomScrollbars style={{ height: "90vh", width: "100vw" }}>
        <div className="container">
          <div className="title"></div>
          <div className="search row">
            <div className="form-group col-2">
              <select
                name="jobType"
                className="form-control"
                onChange={(e) => {
                  setSelectedJobType(e.target.value);
                }}
                value={selectedJobType}
                defaultValue={""}
              >
                <option value="">Tất cả</option>
                {jobTypes &&
                  jobTypes.length > 0 &&
                  jobTypes.map((item, index) => (
                    <option key={index} value={item.keyMap}>
                      {item.valueVi}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group col-2">
              <select
                name="jobGroup"
                className="form-control"
                onChange={(e) => {
                  setSelectedJobGroup(e.target.value);
                }}
                value={selectedJobGroup}
                defaultValue={""}
              >
                <option value="">Tất cả</option>
                {jobGroups &&
                  jobGroups.length > 0 &&
                  jobGroups.map((item, index) => (
                    <option key={index} value={item.keyMap}>
                      {item.valueVi}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group col-2">
              <select
                name="province"
                className="form-control"
                onChange={(e) => {
                  setSelectedProvince(e.target.value);
                }}
                value={selectedProvince}
                defaultValue={""}
              >
                <option value="" disabled hidden>
                  Chọn tỉnh thành
                </option>
                {provinces &&
                  provinces.length > 0 &&
                  provinces.map((item, index) => (
                    <option key={index} value={item.keyMap}>
                      {item.valueVi}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="job-body">
            {jobs &&
              jobs.length > 0 &&
              jobs.map((job, index) => {
                return (
                  <div
                    className="job-content"
                    key={index}
                    onClick={() => {
                      history.push(`/job/${job.id}`);
                    }}
                  >
                    <div
                      className="image"
                      style={{
                        backgroundImage: `url(${
                          job.image
                            ? new Buffer(
                                job.companyData.image,
                                "base64"
                              ).toString("binary")
                            : Background
                        })`,
                      }}
                    ></div>
                    <div className="text-content">
                      <div className="title-content">{job.jobName}</div>
                      <div className="detail-content">
                        <span className="item">{job.jobTypeData.valueVi}</span>
                        <span className="item">
                          {job.companyData.provinceData.valueVi}
                        </span>
                      </div>
                      <div className="date-content">
                        {`Ngày hết hạn: ${moment
                          .unix(+job.dateExpiration / 1000)
                          .format("DD/MM/YYYY")}`}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </CustomScrollbars>
    </>
  );
};
export default Job;
