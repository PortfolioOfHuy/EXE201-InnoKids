import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faDatabase,
  faUserEdit,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
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

  const values = [
    {
      title: "Đổi mới",
      description: "Thay đổi phương pháp giảng dạy truyền thống, áp dụng công nghệ hiện đại vào việc học.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
    },
    {
      title: "Sáng tạo",
      description: "Khuyến khích tư duy sáng tạo và phát triển kỹ năng nghệ thuật độc đáo.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
    },
    {
      title: "Phát triển",
      description: "Tập trung vào sự phát triển toàn diện của học viên về cả kiến thức và kỹ năng.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
    },
    {
      title: "Kết nối",
      description: "Xây dựng cộng đồng học tập năng động và tương tác giữa giáo viên và học viên.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
    }
  ];

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

      {/* About Description Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-purple text-3xl md:text-4xl font-bold mb-6">Về InnoKids</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  InnoKids là một nền tảng trực tuyến cung cấp các khóa học thú vị và
                  sáng tạo về mỹ thuật cho trẻ em. Với các khóa học mỹ thuật đa dạng,
                  InnoKids giúp các bạn nhỏ không chỉ học các kỹ thuật cơ bản mà còn
                  khơi dậy niềm đam mê của riêng mình.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  InnoKids tin rằng mỗi bức tranh đều có câu chuyện riêng, và nhiệm vụ
                  của chúng tôi là giúp các em xây dựng nên câu chuyện của riêng mình.
                  Hãy cùng nhau trải nghiệm những điều thú vị và tạo ra những tác phẩm
                  của riêng mình nhé!
                </p>
              </div>
              <button className="mt-8 bg-purple text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all">
                Xem thêm
              </button>
            </div>
            <div className="w-full md:w-1/2">
              <img
                className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s"
                alt="InnoKids"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-blue bg-bannerImg py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-purple mb-12">
            InnoKids tập trung vào những giá trị
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-purple mb-4">{value.title}</h3>
                  <p className="text-gray-700 mb-6">{value.description}</p>
                </div>
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Vì sao lại chọn InnoKids?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: faUserGraduate, title: "Đổi mới" },
              { icon: faDatabase, title: "Khám phá" },
              { icon: faUserEdit, title: "Phát triển" },
              { icon: faCommentDots, title: "Kết nối" },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FontAwesomeIcon
                  icon={value.icon}
                  className="text-purple text-4xl mb-4"
                />
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">
                  Làm mới, thay đổi các suy nghĩ và tư tưởng lạc hậu về việc trẻ
                  em hứng thú và tiếp cận nghệ thuật từ sớm.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-green bg-bannerImg text-white py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl mb-4">
            Hãy liên hệ hoặc email Innokids nếu bạn có bất kì câu hỏi nào nhé
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold">
            innokids.education@gmail.com
          </h2>
        </div>
      </section>
    </div>
  );
};

export default About;
