import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import { handleGetAllInstructor } from "../../services/teacher-service";

const Home = () => {
  const [instructors, setInstructors] = useState([]);

  const slideContent = [
    {
      title1: "NƠI TRẺ EM PHÁT TRIỂN TÀI NĂNG",
      title2: "VÀ THỂ HIỆN BẢN THÂN",
      description:
        "Tại đây, trẻ được sáng tạo, phát triển tiềm năng và xây dựng sự tự tin. Cùng Innokids, mỗi em sẽ tìm thấy niềm đam mê và cách tỏa sáng riêng!",
    },
    {
      title1: "KHÁM PHÁ KHẢ NĂNG TIỀM ẨN",
      title2: "VÀ XÂY DỰNG TƯƠNG LAI",
      description:
        "Innokids khuyến khích sự sáng tạo, giáo dục toàn diện và mang đến môi trường tốt nhất để trẻ phát triển mọi khía cạnh của bản thân.",
      hasButton: true,
    },
  ];

  useEffect(() => {
    const getAllInstructor = async () => {
      try {
        const res = await handleGetAllInstructor();
        setInstructors(res);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    getAllInstructor();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full bg-background-color">
        <Slide arrows={false} duration={5000} transitionDuration={500}>
          {slideContent.map((content, index) => (
            <div
              key={index}
              className="bg-purple h-[80vh] flex flex-col justify-center items-center text-white px-4 md:px-8 lg:px-16"
            >
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading mb-4">
                  {content.title1}
                </h1>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading mb-6">
                  {content.title2}
                </h2>
                <p className="text-base md:text-lg max-w-2xl mx-auto mb-8">
                  {content.description}
                </p>
                {content.hasButton && (
                  <button className="bg-yellow text-black font-bold px-8 py-3 rounded-lg text-sm hover:bg-opacity-90 transition-all">
                    Xem thêm
                  </button>
                )}
              </div>
            </div>
          ))}
        </Slide>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        {/* Feature 1 */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative rounded-3xl bg-background-color overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8">
              <div className="order-2 md:order-1">
                <img
                  className="w-full h-[300px] object-cover rounded-3xl"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
                  alt="InnoKids"
                />
              </div>
              <div className="order-1 md:order-2 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Quản lý thời gian
                </h3>
                <p className="text-gray-700 mb-8">
                  Với tính năng đặt lịch cho lớp LiveClass, việc hẹn gặp giảng
                  viên chưa bao giờ dễ dàng hơn! Chỉ cần chọn thời gian các em
                  thích và chuẩn bị cho một buổi gặp mặt với giảng viên ngay
                  thôi nào!
                </p>
                <button className="bg-purple text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all">
                  Xem khóa học
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl bg-background-color overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Quản lý thời gian
                </h3>
                <p className="text-gray-700 mb-8">
                  Với tính năng đặt lịch cho lớp LiveClass, việc hẹn gặp giảng
                  viên chưa bao giờ dễ dàng hơn! Chỉ cần chọn thời gian các em
                  thích và chuẩn bị cho một buổi gặp mặt với giảng viên ngay
                  thôi nào!
                </p>
                <button className="bg-purple text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all">
                  Xem khóa học
                </button>
              </div>
              <div>
                <img
                  className="w-full h-[300px] object-cover rounded-3xl"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
                  alt="InnoKids"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Projects Section */}
      <section className="bg-white bg-bannerImg py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple mb-4">
            Sản phẩm học viên
          </h2>
          <p className="text-gray-700 mb-12">
            Hãy cùng khám phá những sản phẩm mà học viên InnoKids đã tạo ra nhé!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <img
                  className="w-full h-[250px] object-cover rounded-3xl shadow-lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
                  alt="InnoKids"
                />
              </div>
            ))}
          </div>

          <button className="bg-purple text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all mb-8">
            Xem thêm
          </button>

          <div className="text-purple font-semibold text-xl mb-16">
            65 Reviews
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-purple mb-4">
            Từ các học viên InnoKids
          </h2>
          <p className="text-gray-700 mb-12">
            Hãy cùng khám phá những sản phẩm mà học viên InnoKids đã tạo ra nhé!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <img
                  className="w-full h-[250px] object-cover rounded-3xl shadow-lg mb-4"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
                  alt="InnoKids"
                />
                <h3 className="font-semibold text-lg">Phạm Bảo Ngọc</h3>
              </div>
            ))}
          </div>

          <button className="bg-purple text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition-all">
            Xem thêm
          </button>
        </div>
      </section>

      {/* Final Section - Teacher Introduction */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Đội Ngũ Giảng Viên Sáng Tạo
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Gặp gỡ những người thầy cô tài năng, những người sẽ truyền cảm
              hứng và đồng hành cùng con bạn trong hành trình khám phá nghệ
              thuật
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    className="w-full h-[300px] object-cover"
                    src={
                      instructor.avatar ||
                      "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3"
                    }
                    alt={instructor.fullName}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold">
                      {instructor.fullName}
                    </h3>
                    <p className="text-white/90">Giảng viên</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-gray-700 font-semibold mb-2">
                      Chuyên môn
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {instructor.skill}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {instructor.experience}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {instructor.introduction}
                  </p>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
                    Xem thông tin
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Gặp gỡ đội ngũ giảng viên
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
