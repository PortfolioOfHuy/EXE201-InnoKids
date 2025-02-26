import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7186",
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    // You can also pass the error along to the calling code
    return Promise.reject(error);
  }
);

export default instance;
