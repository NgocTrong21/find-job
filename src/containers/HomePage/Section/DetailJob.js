import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userServices } from "../../../services";
import CustomScrollbars from "../../../components/CustomScrollbars";
import moment from "moment";
import "./DetailJob.scss";

function DetailJob() {
  const param = useParams();
  const [detailJob, setDetailJob] = useState({});
  let { id } = param;
  useEffect(async () => {
    try {
      let res = await userServices.getJobById(id);
      if (res && res.errorCode === 0) {
        setDetailJob(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  console.log("check job", detailJob);
  return (
    <CustomScrollbars style={{ height: "90vh", width: "100vw" }}>
      <div className="container job-detail">
        <div className="title mb-4">Thông tin việc làm</div>
        <div className="first-content d-flex justify-content-between">
          <div className="job-name">{detailJob && detailJob.jobName}</div>
          <div className="btn">
            <button className="btn-primary px-3">Save</button>
            <button className="btn-primary px-3">Apply</button>
          </div>
        </div>
        <div className="second-content row">
          <div className="left-content col-9">
            <div className="title-description">Mô tả công việc</div>
            <div
              className="detail-job-text"
              dangerouslySetInnerHTML={{
                __html: detailJob.contentHTML,
              }}
            ></div>
          </div>
          <div className="right-content col-3">
            <div className="description">
              <div className="title-description">Thông tin chung</div>
              <div className="item">
                <div className="title-text">Địa điểm</div>
                <div className="address">
                  {detailJob.companyData && detailJob.companyData.address}
                </div>
              </div>
              <div className="item">
                <div className="title-text">Hình thức làm việc</div>
                <div className="job-type">
                  {detailJob &&
                    detailJob.jobTypeData &&
                    detailJob.jobTypeData.valueVi}
                </div>
              </div>
              <div className="item">
                <div className="title-text">Hạn nộp hồ sơ</div>
                <div className="date-expiration">
                  {`Ngày hết hạn: ${moment
                    .unix(+detailJob.dateExpiration / 1000)
                    .format("DD/MM/YYYY")}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomScrollbars>
  );
}

export default DetailJob;
