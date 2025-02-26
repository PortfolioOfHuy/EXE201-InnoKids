import axios from "./customize-axios";

const handleSignUp = (data) => {
  return axios.post(`/v1/api/register-account`, data);
};

const handleSignIn = (data) => {
  return axios.post(`/v1/api/login`, data);
};

const handleVerifyEmail = (token) => {
  return axios.post(`/v1/api/verify-email?token=${token}`);
};

const handleUserById = (id) => {
  return axios.get(`/v1/api/get-user-by-Id?id=${id}`);
};

const handleUpdateProfile = (userId, fullName, phoneNumber) => {
  return axios.post(`/v1/api/update-profile`, {
    userId,
    fullName,
    phoneNumber,
  });
};

const handleUserChangePassword = (
  userId,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  return axios.post(`/v1/api/change-password`, {
    userId,
    oldPassword,
    newPassword,
    confirmPassword,
  });
};

export {
  handleSignUp,
  handleSignIn,
  handleVerifyEmail,
  handleUserById,
  handleUpdateProfile,
  handleUserChangePassword,
};
