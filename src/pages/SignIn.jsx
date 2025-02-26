import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  Card,
  Divider,
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { handleSignIn } from "../services/user-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title, Paragraph } = Typography;

const SignIn = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await handleSignIn(values);
      localStorage.setItem("token", res.data);
      if (res.status === 200) {
        navigate("/");
        message.success("Đăng nhập thành công");
        form.resetFields();
      }
    } catch (error) {
      message.error(error.response?.data);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #006e61 0%, #00c0b5 100%)",
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          border: "none",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title
            level={2}
            style={{
              color: "#006e61",
              marginBottom: "10px",
              fontSize: "28px",
            }}
          >
            Chào mừng trở lại!
          </Title>
          <Paragraph style={{ color: "#666", fontSize: "16px" }}>
            Đăng nhập để tiếp tục theo dõi sự phát triển của con bạn
          </Paragraph>
        </div>

        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
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
          >
            <Input
              prefix={<UserOutlined style={{ color: "#00c0b5" }} />}
              placeholder="Nhập email của bạn"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#00c0b5" }} />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
            <a href="/forgot-password" style={{ color: "#00c0b5" }}>
              Quên mật khẩu?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#00c0b5",
                borderColor: "#00c0b5",
                height: "45px",
                borderRadius: "8px",
                fontSize: "16px",
                marginBottom: "16px",
              }}
            >
              Đăng nhập
            </Button>

            <Divider style={{ color: "#666" }}>hoặc</Divider>

            <Button
              block
              style={{
                height: "45px",
                borderRadius: "8px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FontAwesomeIcon icon={faGoogle} />
              Đăng nhập với Google
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Paragraph style={{ color: "#666" }}>
              Chưa có tài khoản?{" "}
              <a href="/signup" style={{ color: "#00c0b5", fontWeight: 500 }}>
                Đăng ký ngay
              </a>
            </Paragraph>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
