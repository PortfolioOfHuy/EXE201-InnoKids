import axios from "./customize-axios";

const handleSendMessage = (chatId, senderId, text) => {
  return axios.post(`/api/Message/SendMessage`, {
    chatId,
    senderId,
    text,
  });
};

const handleViewMessage = (payload) => {
  const chatId = payload[0].chatId;
  return axios.get(`/api/Message/ViewMessage?chatId=${chatId}`);
};

export { handleSendMessage, handleViewMessage };
