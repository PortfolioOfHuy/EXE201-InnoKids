import axios from "./customize-axios";

const handleCreatePayment = (packageId) => {
  return axios.post(`/create-payment?orderId=${packageId}`);
};

const handleAddPayment = (
  paymentId,
  userId,
  packageId,
  amout,
  status,
  orderCode,
  accountNumber,
  description
) => {
  return axios.post(
    `/add-payment?PaymentId=${paymentId}&UserId=${userId}&PackageId=${packageId}&Amount=${amout}&Status=${status}&OrderCode=${orderCode}&AccountNumber=${accountNumber}&Description=${description}`
  );
};

const handleUpdatePayment = (paymentId, status) => {
  return axios.put(`/udpate-payment?id=${paymentId}&status=${status}`);
};

const handleGetLink = (orderCode) => {
  return axios.get(`/get-link?orderId=${orderCode}`);
};

export {
  handleCreatePayment,
  handleAddPayment,
  handleUpdatePayment,
  handleGetLink,
};
