import { Input, Button, Form, Modal, Flex, Checkbox } from "antd";
import { useState } from "react";
import { getSendEmail, postLogin } from "../../services/user-service";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/counterSlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

function Login() {
  const [setEmail] = useState("");
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { loginInput, password } = values;

      // Xác thực đầu vào
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginInput);
      const isNumericAndValid = /^[a-zA-Z0-9]{6,12}$/.test(loginInput);

      if (!isEmail && !isNumericAndValid) {
        toast.error(
          "Tên đăng nhập phải dài từ 6-12 ký tự, chỉ chứa chữ cái và số, hoặc là email hợp lệ."
        );
        return;
      }

      const res = await postLogin(loginInput, password);

      if (res.error === 0) {
        const token = res.data;
        localStorage.setItem("token", token);
        const user = jwtDecode(token);
        dispatch(login(user));

        // Điều hướng dựa trên role
        switch (user.Role) {
          case "Admin":
            navigate("/admin");
            break;
          case "Instructor":
            navigate("/teacherDash");
            break;
          case "Customer":
            navigate("/");
            break;
          default:
            navigate("/");
        }

        toast.success("Đăng nhập thành công! 🎉");
      } else if (res.error === 1) {
        const errorMessage =
          Array.isArray(res.data) && res.data.length > 0
            ? res.data[0]
            : res.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Có lỗi xảy ra khi đăng nhập!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirm = () => {
    let tempEmail = "";
    modal.confirm({
      title: "Nhập email của bạn",
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: (
        <Input
          onChange={(e) => (tempEmail = e.target.value)}
          placeholder="Nhập email của bạn"
        />
      ),
      okText: "Gửi",
      cancelText: "Hủy",
      onOk() {
        handleSendEmail(tempEmail);
      },
    });
  };

  const handleSendEmail = async (email) => {
    try {
      const res = await getSendEmail(email);
      if (res.error === 0) {
        navigate("/verify");
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background-color-cover bg-bannerImg bg-no-repeat bg-cover">
      <div className="w-full max-w-md mx-4">
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="font-heading text-6xl md:text-7xl text-white mb-4 animate-bounce">
            Chào mừng bạn!
          </h1>
          <p className="text-white/90 text-xl">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-yellow hover:text-yellow/90 font-medium underline hover:scale-105 inline-block transition-transform"
            >
              Tham gia ngay nào! 🎨
            </Link>
          </p>
        </div>

        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-white/30 transform hover:scale-[1.01] transition-all">
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
            className="space-y-6"
          >
            <Form.Item
              name="loginInput"
              rules={[
                {
                  required: true,
                  message: "Bạn quên nhập tên đăng nhập rồi! 😊",
                },
                { min: 6, message: "Tên đăng nhập cần ít nhất 6 ký tự nhé!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-yellow text-xl" />}
                placeholder="Nhập tên của bạn"
                size="large"
                className="h-14 rounded-xl bg-white/20 border-2 border-white/30 placeholder:text-white/70 text-lg hover:border-yellow/50 focus:border-yellow transition-colors"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Bạn quên nhập mật khẩu rồi! 🔑" },
                {
                  min: 6,
                  message: "Mật khẩu cần ít nhất 6 ký tự để an toàn hơn!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-yellow text-xl" />}
                placeholder="Nhập mật khẩu bí mật"
                size="large"
                className="h-14 rounded-xl bg-white/20 border-2 border-white/30 placeholder:text-white/70 text-lg hover:border-yellow/50 focus:border-yellow transition-colors"
                iconRender={(visible) => (
                  <div className="text-yellow text-xl">
                    {visible ? "👀" : "🔒"}
                  </div>
                )}
              />
            </Form.Item>

            <Flex justify="space-between" align="center" className="mb-2">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-white hover:scale-105 transition-transform">
                  <span className="text-lg">Nhớ tài khoản 🌟</span>
                </Checkbox>
              </Form.Item>
              {contextHolder}
              <Button
                type="link"
                onClick={confirm}
                className="text-yellow hover:text-yellow/90 p-0 text-lg hover:scale-105 transition-transform"
              >
                Quên mật khẩu? 🤔
              </Button>
            </Flex>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                disabled={isSubmitting}
                className={`h-14 ${
                  isSubmitting
                    ? "bg-yellow/70 cursor-not-allowed"
                    : "bg-yellow hover:bg-yellow/90"
                } text-black font-bold text-xl rounded-xl border-none shadow-lg transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-black border-t-transparent" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  "Bắt đầu học nào! 🎨"
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
