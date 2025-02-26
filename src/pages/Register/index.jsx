import { Input, Modal, Button, Form, Checkbox } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getVerify, postRegister } from "../../services/user-service";
import { toast } from "react-toastify";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

function Register() {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [otp, setOTP] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirm = () => {
    let tempOtp = "";

    const sharedProps = {
      onChange: (value) => {
        tempOtp = value.toUpperCase();
      },
      formatter: (value) => value.toUpperCase(),
      placeholder: "Enter OTP",
    };

    modal.confirm({
      title: "Verify OTP",
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: <Input.OTP {...sharedProps} />,
      okText: "Verify",
      cancelText: "Cancel",
      onOk() {
        setOTP(tempOtp);
        handelVerify(tempOtp);
      },
    });
  };

  const onFinish = async (values) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { userName, email, password, confirmPassword } = values;

      // Validate username
      const isUserNameValid =
        /^[a-zA-Z0-9]{6,12}$/.test(userName) && !userName.includes("\b");
      if (!isUserNameValid) {
        toast.error(
          "Tên đăng nhập phải dài từ 6-12 ký tự, chỉ chứa chữ cái và số."
        );
        return;
      }

      // Validate email
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmailValid) {
        toast.error("Vui lòng nhập địa chỉ email hợp lệ.");
        return;
      }

      // Validate password
      if (password.length < 8) {
        toast.error("Mật khẩu phải có ít nhất 8 ký tự.");
        return;
      }

      // Confirm password match
      if (password !== confirmPassword) {
        toast.error("Mật khẩu xác nhận không khớp.");
        return;
      }

      // Gửi yêu cầu đăng ký
      const res = await postRegister(
        userName,
        email,
        password,
        confirmPassword
      );

      if (res.error === 0) {
        confirm(); // Gọi xác nhận OTP
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success(res.message);
      } else if (res.error === 1) {
        const errorMessage =
          Array.isArray(res.data) && res.data.length > 0
            ? res.data[0]
            : res.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Có lỗi xảy ra khi đăng ký!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handelVerify = async (otp) => {
    let res = await getVerify(email, otp);

    if (res && res.error === 0) {
      navigate("/login");
      setOTP("");
      toast.success("Đăng ký thành công!");
    } else if (res && res.error === 1) {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background-color-cover bg-bannerImg bg-no-repeat bg-cover">
      <div className="w-full max-w-md mx-4">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="font-heading text-6xl md:text-7xl text-white mb-4 animate-bounce">
            Tham gia cùng InnoKids!
          </h1>
          <p className="text-white/90 text-xl">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-yellow hover:text-yellow/90 font-medium underline hover:scale-105 inline-block transition-transform"
            >
              Đăng nhập nào! ✨
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border-2 border-white/30 transform hover:scale-[1.01] transition-all">
          <Form
            name="registerForm"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="space-y-6"
          >
            <Form.Item
              name="userName"
              validateDebounce={1000}
              hasFeedback
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
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="h-14 rounded-xl bg-white/20 border-2 border-white/30 placeholder:text-white/70 text-lg hover:border-yellow/50 focus:border-yellow transition-colors"
                placeholder="Tạo tên đăng nhập thật độc đáo"
              />
            </Form.Item>

            <Form.Item
              name="email"
              validateDebounce={1000}
              hasFeedback
              rules={[
                { required: true, message: "Bạn quên nhập email rồi! 📧" },
                { type: "email", message: "Email này không đúng format rồi!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-yellow text-xl" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 rounded-xl bg-white/20 border-2 border-white/30 placeholder:text-white/70 text-lg hover:border-yellow/50 focus:border-yellow transition-colors"
                placeholder="Nhập email của bạn"
              />
            </Form.Item>

            <Form.Item
              name="password"
              validateDebounce={1000}
              hasFeedback
              rules={[
                { required: true, message: "Bạn quên tạo mật khẩu rồi! 🔑" },
                {
                  min: 8,
                  message: "Mật khẩu cần ít nhất 8 ký tự để an toàn hơn!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-yellow text-xl" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-14 rounded-xl bg-white/20 border-2 border-white/30 placeholder:text-white/70 text-lg hover:border-yellow/50 focus:border-yellow transition-colors"
                placeholder="Tạo mật khẩu bí mật"
                iconRender={(visible) => (
                  <div className="text-yellow text-xl">
                    {visible ? "👀" : "🔒"}
                  </div>
                )}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              validateDebounce={1000}
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Bạn quên xác nhận mật khẩu rồi! 🔐",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Hai mật khẩu không giống nhau rồi! 🤔")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-yellow text-xl" />}
                className="h-14 rounded-xl bg-white/20 border-2 border-white/30 placeholder:text-white/70 text-lg hover:border-yellow/50 focus:border-yellow transition-colors"
                placeholder="Nhập lại mật khẩu bí mật"
                iconRender={(visible) => (
                  <div className="text-yellow text-xl">
                    {visible ? "👀" : "🔒"}
                  </div>
                )}
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(
                            "Bạn cần đồng ý với điều khoản để tiếp tục nhé! 📜"
                          )
                        ),
                },
              ]}
            >
              <Checkbox className="text-white hover:scale-105 transition-transform">
                <span className="text-lg">
                  Mình đồng ý với các{" "}
                  <Link
                    to="/terms"
                    className="text-yellow hover:text-yellow/90 underline"
                  >
                    điều khoản
                  </Link>{" "}
                  📝
                </span>
              </Checkbox>
            </Form.Item>

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
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  "Bắt đầu cuộc phiêu lưu! 🚀"
                )}
              </Button>
            </Form.Item>
            {contextHolder}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
