import axios from "../axios";

export const handleLoginApi = (email, password) => {
  console.log();
  return axios.post("/api/login", { email, password });
};

export const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

export const getPostNewUser = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

export const deleteUser = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};

export const editUser = (userData) => {
  return axios.put(`api/edit-user`, userData);
};

export const getAllCode = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

export const postNewCompany = (data) => {
  return axios.post(`/post-company`, data);
};

export const getCompanyById = (inputId) => {
  return axios.get(`/get-company-by-id?id=${inputId}`);
};

export const postNewJob = (inputData) => {
  return axios.post(`/post-job`, inputData);
};

export const getJobById = (inputId) => {
  return axios.get(`/get-job-by-id?id=${inputId}`);
};

export const searchJob = (inputData) => {
  console.log("check input data", inputData);
  return axios.post("/search-job", inputData);
};
