import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCircleExclamation, 
  faHome, 
  faRotateRight 
} from "@fortawesome/free-solid-svg-icons";

const Error500 = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background-color flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 text-yellow">
          <FontAwesomeIcon 
            icon={faCircleExclamation} 
            className="text-8xl animate-pulse" 
          />
        </div>

        {/* Error Code */}
        <h1 className="text-9xl font-bold text-yellow mb-4">500</h1>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Lỗi Máy Chủ Nội Bộ
          </h2>
          <p className="text-gray-400">
            Xin lỗi, đã có lỗi xảy ra từ phía máy chủ. 
            Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            type="primary"
            size="large"
            icon={<FontAwesomeIcon icon={faRotateRight} />}
            onClick={handleRefresh}
            className="bg-yellow hover:bg-yellow/90 text-black font-medium px-6"
          >
            Tải Lại Trang
          </Button>
          <Button
            size="large"
            icon={<FontAwesomeIcon icon={faHome} />}
            onClick={handleBackHome}
            className="border-yellow text-yellow hover:text-yellow/90 hover:border-yellow/90 font-medium px-6"
          >
            Về Trang Chủ
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-gray-400">
          <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ:</p>
          <p className="font-medium text-yellow">
            support@innokids.com | 0123 456 789
          </p>
        </div>

        {/* Error ID - Helpful for debugging */}
        <div className="mt-8 text-sm text-gray-500">
          Error ID: {crypto.randomUUID().split('-')[0]}
        </div>
      </div>
    </div>
  );
};

export default Error500; 