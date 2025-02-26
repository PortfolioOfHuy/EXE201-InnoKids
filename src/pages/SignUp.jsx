import { useState } from "react";
import { Form, Input, Button, Divider, message, Typography, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { handleSignUp } from "../services/user-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //TODO: call api register-user
  const handleSubmit = async (values) => {
    try {
      const res = await handleSignUp(values);
      if (res.status === 200) {
        navigate("/signin");
        message.success("Hãy kiểm tra email để xác thực tài khoản!");
        form.resetFields();
      } else {
        message.error("Đăng ký tài khoản thất bại!!");
      }
    } catch (error) {
      message.error(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  //TODO: Google authen
  const handleGoogleSignIn = () => {
    // Implement Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  // Thêm hàm validate phone number
  const validatePhoneNumber = (phone) => {
    if (!phone) return false;
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const styles = {
    card: {
      borderRadius: "15px",
      border: "none",
    },
    input: {
      borderRadius: "8px",
    },
    button: {
      borderRadius: "8px",
      height: "45px",
    },
    googleButton: {
      borderRadius: "8px",
      height: "45px",
      border: "1px solid #ddd",
      backgroundColor: "white",
    },
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #006e61 0%, #00c0b5 100%)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: "380px",
          width: "100%",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          border: "none",
        }}
        bodyStyle={{ padding: "24px 20px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <Title
            level={2}
            style={{
              color: "#006e61",
              marginBottom: "8px",
              fontSize: "24px",
            }}
          >
            Tạo tài khoản mới!
          </Title>
          <Paragraph
            style={{ color: "#666", fontSize: "14px", marginBottom: 0 }}
          >
            Đăng ký để bắt đầu theo dõi sự phát triển của con bạn
          </Paragraph>
        </div>

        <Form
          form={form}
          name="signup"
          onFinish={handleSubmit}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item
            name="fullName"
            label={<span style={{ fontSize: "14px" }}>Họ và tên</span>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên của bạn!",
              },
            ]}
            style={{ marginBottom: "16px" }}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#00c0b5" }} />}
              placeholder="Nhập họ và tên của bạn"
              style={{ height: "40px" }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span style={{ fontSize: "14px" }}>Email</span>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
            style={{ marginBottom: "16px" }}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#00c0b5" }} />}
              placeholder="Nhập email của bạn"
              style={{ height: "40px" }}
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={<span style={{ fontSize: "14px" }}>Số điện thoại</span>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Số điện thoại chỉ được chứa số!",
              },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();

                  if (value.length > 11) {
                    return Promise.reject(
                      "Số điện thoại không được quá 11 ký tự!"
                    );
                  }

                  if (value.length < 10) {
                    return Promise.reject(
                      "Số điện thoại phải có ít nhất 10 ký tự!"
                    );
                  }

                  if (!validatePhoneNumber(value)) {
                    return Promise.reject(
                      "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam (VD: 0912345678 hoặc 84912345678)"
                    );
                  }

                  return Promise.resolve();
                },
              },
            ]}
            style={{ marginBottom: "16px" }}
            validateTrigger="onBlur"
          >
            <Input
              prefix={<PhoneOutlined style={{ color: "#00c0b5" }} />}
              placeholder="Nhập số điện thoại của bạn"
              style={{ height: "40px" }}
              maxLength={11}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontSize: "14px" }}>Mật khẩu</span>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
            style={{ marginBottom: "20px" }}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#00c0b5" }} />}
              placeholder="Nhập mật khẩu"
              style={{ height: "40px" }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "16px" }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                backgroundColor: "#00c0b5",
                borderColor: "#00c0b5",
                height: "40px",
                borderRadius: "6px",
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              Đăng ký
            </Button>

            <Divider style={{ color: "#666", margin: "12px 0" }}>hoặc</Divider>

            <Button
              block
              style={{
                height: "40px",
                borderRadius: "6px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FontAwesomeIcon icon={faGoogle} />
              Đăng ký với Google
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Paragraph
              style={{ color: "#666", fontSize: "14px", marginBottom: 0 }}
            >
              Đã có tài khoản?{" "}
              <a href="/signin" style={{ color: "#00c0b5", fontWeight: 500 }}>
                Đăng nhập ngay
              </a>
            </Paragraph>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
