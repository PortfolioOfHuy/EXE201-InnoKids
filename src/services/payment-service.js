import axios from "./customize-axios";

const handleCreatePayment = (courseId) => {
  return axios.post(`/payment?courseId=${courseId}`);
};

export { handleCreatePayment };
