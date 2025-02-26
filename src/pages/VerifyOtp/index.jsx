import { Form, Input, Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVerify } from "../../services/user-service";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const [setOTP] = useState("");
  const email = localStorage.getItem("email") || "";
  const navigate = useNavigate();

  const handleVerify = async (otpValue) => {
    const res = await getVerify(email, otpValue);

    if (res && res.error === 0) {
      toast.success(res.message);
      navigate("/login");
      setOTP("");
    } else if (res && res.error === 1) {
      toast.error(res.message);
    }
  };

  const onFinish = (values) => {
    const { otp } = values;

    if (!otp) {
      toast.error("OTP cannot be empty!");
      return;
    }

    handleVerify(otp);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background-color-cover bg-bannerImg bg-no-repeat">
      <div className="w-screen flex justify-center items-center flex-col gap-8">
        <div>
          <h1 className="font-heading text-white text-7xl">Nhập mã OTP</h1>
        </div>
        <Form
          name="loginForm"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="otp"
            rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
          >
            <Input.OTP placeholder="Nhập mã OTP" className="py-5 rounded-xl" />
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              className="text-black font-bold bg-yellow px-4 py-5 rounded-xl"
            >
              Xác thực
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyPage;
