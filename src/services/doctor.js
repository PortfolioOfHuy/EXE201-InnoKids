import axios from "./customize-axios";

const handleCreatePost = (doctorId, data, description) => {
    const url = `/v1/api/create-post?DoctorID=${doctorId}&Description=${encodeURIComponent(description)}`;
    
    return axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};
const handleUpdatePost = (doctorId, postId, data, description) => {
    const url = `/v1/api/update-post?DoctorID=${doctorId}&PostID=${postId}&Description=${encodeURIComponent(description)}`;
    return axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

  const fetchPost = () => {
    return axios.get(`/v1/api/get-all-post`);
  }
  const FetchPostInfoById= (id) =>{
    return axios.get(`/v1/api/get-post-by-post-id?req=${id}`)
  }
  const FetchDoctorPostById= (id) =>{
    return axios.get(`/v1/api/Get-All-Post-By-Doctor-Id?req=${id}`)
  }
  export {
    handleCreatePost,
    fetchPost,
    FetchPostInfoById,
    FetchDoctorPostById,
    handleUpdatePost,
  }