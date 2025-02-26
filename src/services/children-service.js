import axios from "./customize-axios";

const handleAddChildren = (parentId, genderId, name, birthday) => {
  return axios.post(`/v1/api/create-children`, {
    parentId,
    genderId,
    name,
    birthday,
  });
};

const handleGetChildrenByParentId = (parentId) => {
  return axios.get(`/v1/api/get-children-by-parentid?request=${parentId}`);
};

const handleCreateHealthRecord = (data) => {
  return axios.post(`/v1/api/create-health-record`, data);
};

const fetchHelthRecords = () => {
  return axios.get(`v1/api/get-all-healthrecord`);
};

export { 
  handleAddChildren, 
  handleGetChildrenByParentId, 
  fetchHelthRecords,
  handleCreateHealthRecord 
};
