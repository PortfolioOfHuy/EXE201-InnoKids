import axios from "./customize-axios";

const handleGetAllPackage = () => {
  return axios.get(`/v1/api/get-all-premiumpack`);
};

const handleGetPremiumById = (id) => {
  return axios.get(`/v1/api/get-premium-by-id?id=${id}`);
};

export { handleGetAllPackage, handleGetPremiumById };
