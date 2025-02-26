import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const Announcement = () => {
  // State để lưu trạng thái On/Off
  const [isOn, setIsOn] = useState(false);

  // Hàm toggle để chuyển đổi trạng thái
  const toggleState = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div className="bg-purple bg-bannerImg py-10  ">
        <h3 className="mx-auto w-2/3 mb-5 text-white"> <a href="/">Trang chủ</a> <FontAwesomeIcon icon={faAngleRight}/> <a href="/account">Tài khoản</a>  <FontAwesomeIcon icon={faAngleRight}/> <a href="announcement">Thông báo</a> </h3>
      <div className="mx-auto w-2/3 bg-background-color  px-3 py-5 rounded-2xl  ">
        <div className="flex justify-between mx-auto w-full  bg-white rounded-2xl px-5 py-2 ">
          <h2>Bật thông báo</h2>
          <div
            className={`border relative h-3 w-16 rounded-3xl p-4  shadow-button-shadow ${
              isOn ? "bg-pink " : "bg-white"
            }`}
          >
            <div
              className={`border absolute top-0  h-8 w-8 : cursor-pointer rounded-full ${
                isOn ? "bg-white border-black right-0" : "bg-gray-400 left-0"
              }`}
              onClick={toggleState}
            ></div>
          </div>
        </div>
        <div className="flex justify-between mx-auto w-full h-fit rounded-xl mt-3 py-5 bg-yellow px-3">
          <h2>Chúc mừng bạn đã đăng kí tài khoản thành công!</h2>
          <div>
            <h4>11/11/2024</h4>
            <span>1 ngày trước</span>
            <br />
            <button className="bg-red-500 rounded-xl px-2 text-white">Xóa</button>
          </div>
        </div>
        <div className="flex justify-between mx-auto w-full h-fit rounded-xl mt-3 py-5 bg-yellow px-3">
          <h2>Chúc mừng bạn đã thay đổi thông tin cá nhân thành công!</h2>
          <div>
            <h4>11/11/2024</h4>
            <span>1 ngày trước</span>
            <br />
            <button className="bg-red-500 rounded-xl px-2 text-white">Xóa</button>
          </div>
        </div>
        <div className="flex justify-between mx-auto w-full h-fit rounded-xl mt-3 py-5 bg-yellow px-3 ">
          <h2>Chúc mừng bạn mua sản phẩm thành công!</h2>
          <div>
            <h4>11/11/2024</h4>
            <span>1 ngày trước</span>
            <br />
            <button className="bg-red-500 py-1 rounded-xl px-2 text-white ">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcement;
