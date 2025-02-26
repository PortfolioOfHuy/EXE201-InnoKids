import axios from "./customize-axios";

const postRegisterTeacher = (formData) => {
  return axios.post(`/api/Teacher/RegisterTeacher/register-teacher`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const handleGetAllInstructor = () => {
  return axios.get(`/api/Teacher/GetAllInstructor`);
};

const handleGetChat = (userId) => {
  return axios.get(`/api/Chat/GetAllChat?memberId=${userId}`);
};

const handleGetInstructorById = (id) => {
  return axios.get(`/api/Teacher/GetInstructorById?id=${id}`);
};

export {
  postRegisterTeacher,
  handleGetAllInstructor,
  handleGetChat,
  handleGetInstructorById,
};
