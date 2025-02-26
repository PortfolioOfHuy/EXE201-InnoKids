import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleGetCourseById } from "../../services/course-service";
import { handleCreatePayment } from "../../services/payment-service";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const res = await handleGetCourseById(id);
        if (res) {
          setCourse(res);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu khóa học.");
      }
    };

    getCourseById();
  }, [id]);

  const paymentRequest = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await handleCreatePayment(id);

      console.log(res);

      if (res?.checkoutUrl) {
        window.location.href = res.checkoutUrl; // Chuyển hướng đến trang thanh toán
      } else {
        throw new Error("Thanh toán thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi thực hiện thanh toán.");
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="bg-blue bg-bannerImg">
      <div className="mx-auto w-2/3 pb-5">
        <h2 className="text-6xl font-bold py-5">{course.title}</h2>
        <img
          className="w-full h-[60vh] object-cover rounded-2xl"
          src={course.thumbNail}
          alt={course.title}
        />
        <div className="flex justify-between mt-5">
          <div>
            <h4>Giảng viên</h4>
            <p>{course.instructor}</p>
            <h4>Dịch vụ</h4>
            <p>{course.service}</p>
            <h4>Giá</h4>
            <p>{course.price.toLocaleString()} VND</p>
          </div>
          <button
            className="bg-pink py-2 px-3 rounded-xl"
            onClick={paymentRequest}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Thanh toán"}{" "}
            <FontAwesomeIcon className="text-black" icon={faCartPlus} />
          </button>
        </div>
        {error && <p className="text-red-500 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default CourseDetail;
