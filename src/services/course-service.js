import axios from "./customize-axios";

const handleGetAllCourse = () => {
  return axios.get(`/api/Course/GetAllCourse/GetAllCourse`);
};

const createCourse = (
  title,
  description,
  price,
  userId,
  serviceId,
  thumbNail
) => {
  const formData = new FormData();
  formData.append("ThumbNail", thumbNail);

  return axios.post(
    `/api/Course/CreateCourse/CreateCourse?Title=${encodeURIComponent(
      title
    )}&Description=${encodeURIComponent(
      description
    )}&Price=${price}&userId=${userId}&ServiceId=${serviceId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const handleGetCourseById = (courseId) => {
  return axios.get(
    `/api/Course/GetCourseById/get-course-by-id?courseId=${courseId}`
  );
};

export { handleGetAllCourse, createCourse, handleGetCourseById };
