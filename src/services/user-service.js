import axios from "./customize-axios";

const postRegister = (userName, email, password, confirmPassword) => {
  return axios.post(`/api/User/Register/register`, {
    userName,
    email,
    password,
    confirmPassword,
  });
};

const getVerify = (email, otp) => {
  return axios.get(
    `/api/User/Verify/verify?email=${encodeURIComponent(
      email
    )}&otp=${encodeURIComponent(otp)}`
  );
};

const postLogin = (loginInput, password) => {
  return axios.post(`/api/User/Login/login`, { loginInput, password });
};

const getSendEmail = (email) => {
  return axios.get(`/api/User/SendEmail?email=${encodeURIComponent(email)}`);
};

const getUserById = (id) => {
  return axios.get(`/api/User/GetUserById?id=${encodeURIComponent(id)}`);
};

const postUpdateProfile = (id, username, email) => {
  return axios.post(`/api/User/UpdateProfile`, { userId: id, username, email });
};

const postChangePassword = (id, oldPassword, newPassword, confirmPassword) => {
  return axios.post(`/api/User/ChangePassword`, {
    userId: id,
    oldPassword,
    newPassword,
    confirmPassword,
  });
};

const handleGetAllCourseByUser = (userId) => {
  return axios.get(`/api/User/GetCourseByUserId?userId=${userId}`);
};

const handleGetPendingCourse = (userId) => {
  return axios.get(`/UserViewPendingCourseTransaction?userId=${userId}`);
};

export {
  postRegister,
  getVerify,
  postLogin,
  getSendEmail,
  getUserById,
  postUpdateProfile,
  postChangePassword,
  handleGetAllCourseByUser,
  handleGetPendingCourse,
};
