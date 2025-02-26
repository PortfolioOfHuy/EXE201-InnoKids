import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/counterSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faPhone,
  faLocationDot 
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebook, 
  faInstagram, 
  faYoutube, 
  faTiktok 
} from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

function Footer() {
  const user = useSelector(selectUser);

  const footerLinks = {
    overview: [
      { title: "Khóa học của tôi", path: "/my-courses" },
      { title: "Về InnoKids", path: "/about" },
      { title: "Khóa học", path: "/courses" },
      { title: "Blog", path: "/blog" },
      { title: "Liên hệ", path: "/contact" },
    ],
    policies: [
      { title: "Chính sách thanh toán học phí", path: "/payment-policy" },
      { title: "Chính sách bảo mật thông tin", path: "/privacy-policy" },
      { title: "Điều khoản sử dụng", path: "/terms" },
      { title: "Chính sách cấp bằng chứng nhận", path: "/certificate-policy" },
      { title: "Chính sách hoàn trả học phí", path: "/refund-policy" },
    ],
  };

  return (
    <footer className="bg-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src="/Logo.png" alt="InnoKids" className="h-12" />
            <p className="text-gray-600 text-sm">
              InnoKids - Nền tảng học lập trình trực tuyến hàng đầu cho trẻ em tại Việt Nam
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition-colors">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <FontAwesomeIcon icon={faTiktok} size="lg" />
              </a>
            </div>
          </div>

          {/* Overview Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Tổng Quan</h3>
            <ul className="space-y-2">
              {footerLinks.overview.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-background-color-cover transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Chính Sách</h3>
            <ul className="space-y-2">
              {footerLinks.policies.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-background-color-cover transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact/Register Section */}
          <div>
            {user ? (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Xin chào!</h3>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-background-color-cover transition-colors"
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span>{user.Username}</span>
                </Link>
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Liên hệ với chúng tôi</h4>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>Hà Nội, Việt Nam</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faPhone} />
                      <span>0123 456 789</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span>innokids.education@gmail.com</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Đăng Ký Ngay</h3>
                <p className="text-gray-600">Tham gia cùng InnoKids để phát triển tương lai cho con bạn</p>
                <Link
                  to="/register"
                  className="inline-block bg-yellow text-black font-medium px-6 py-2 rounded-xl hover:bg-yellow/90 transition-colors"
                >
                  Đăng Ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-background-color-cover">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="text-center md:text-left">
              <a href="#" className="text-white hover:text-yellow transition-colors">
                @innokids.official
              </a>
            </div>
            <div className="text-center text-white">
              innokids.education@gmail.com
            </div>
            <div className="text-center md:text-right text-white">
              Hotline: 0123 456 789
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
