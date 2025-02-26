import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7282",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  function (response) {
    // Trả về response như bình thường
    return response.data;
  },
  function (error) {
    // Chỉ ném lỗi nếu status code là 500
    if (error.response && error.response.status === 500) {
      return Promise.reject(new Error(error.response.data?.message || "Internal Server Error"));
    }
    // Trả về response nếu lỗi không phải 500
    return Promise.resolve(error.response?.data || error.message);
  }
);

export default instance;
