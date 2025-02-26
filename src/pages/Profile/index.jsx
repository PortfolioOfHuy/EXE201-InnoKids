import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import {
  getUserById,
  postChangePassword,
  postUpdateProfile,
} from "../../services/user-service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  const getUser = async () => {
    try {
      const res = await getUserById(userId);
      if (res.data) {
        setUserData(res.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const onUpdateProfile = async (value) => {
    const { username, email } = value;
    const userId = user.Id;

    try {
      const isUserNameValid = /^[a-zA-Z0-9]{6,12}$/.test(username);
      if (!isUserNameValid) {
        toast.error(
          "Tên đăng nhập phải dài từ 6-12 ký tự, chỉ chứa chữ cái và số."
        );
        return;
      }

      const res = await postUpdateProfile(userId, username, email);

      if (res.error === 0) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi không mong muốn.");
    }
  };

  const onChangePassword = async (value) => {
    const { oldPassword, newPassword, confirmPassword } = value;
    const userId = user.Id;
    try {
      const res = await postChangePassword(
        userId,
        oldPassword,
        newPassword,
        confirmPassword
      );

      if (res.error === 0) {
        toast.success(res.message, {
          onClose: () => window.location.reload(),
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error.message || "Đã xảy ra lỗi không mong muốn.");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Playful Design */}
      <div className="w-full -mt-6">
        <section className="bg-gradient-to-r from-purple to-background-color-cover py-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow/20 rounded-full animate-float"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink/20 rounded-full animate-float-delayed"></div>
            <div className="absolute top-20 right-20 w-12 h-12 bg-blue/20 rounded-full animate-spin-slow"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl text-realWhite mb-4 font-heading">
                  Xin chào, {userData?.username || "Bạn nhỏ"}!
                  <span className="inline-block animate-wave ml-2">👋</span>
                </h1>
                <p className="text-realWhite/90 text-lg md:text-xl font-body">
                  Hãy cùng khám phá hành trình sáng tạo của bạn nhé! ✨
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow/30 to-pink/30 rounded-full flex items-center justify-center border-4 border-realWhite/30 shadow-lg transform hover:scale-105 transition-all">
                  <UserOutlined className="text-5xl text-realWhite" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-realWhite rounded-3xl shadow-xl p-8 sticky top-24 transform hover:scale-[1.02] transition-all duration-300">
                <div className="flex flex-col items-center">
                  {/* Profile Picture - Updated */}
                  <div className="relative group">
                    <div className="w-36 h-36 bg-gradient-to-br from-yellow via-pink to-purple rounded-full flex items-center justify-center mb-6 border-4 border-yellow/20 shadow-lg">
                      <UserOutlined className="text-5xl text-realWhite" />
                    </div>
                  </div>

                  <h3 className="text-2xl text-gray-800 mb-2 font-heading">
                    {userData?.username || "Họ và tên"}
                  </h3>
                  <div className="px-4 py-1 bg-purple/10 rounded-full mb-6">
                    <p className="text-purple text-sm font-medium">
                      ⭐ Nhà sáng tạo nhí
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Forms */}
            <div className="lg:col-span-8 space-y-8">
              {/* Profile Update Form */}
              <div className="bg-realWhite rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                <div className="px-8 py-6 border-b border-gray-100">
                  <h2 className="text-2xl text-gray-800 flex items-center gap-3 font-heading">
                    <div className="w-10 h-10 bg-yellow/20 rounded-xl flex items-center justify-center">
                      <UserOutlined className="text-xl text-yellow" />
                    </div>
                    Thông Tin Cá Nhân
                  </h2>
                </div>
                <div className="p-8">
                  {userData ? (
                    <Form
                      name="profile"
                      layout="vertical"
                      onFinish={onUpdateProfile}
                      initialValues={userData}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          label={
                            <span className="font-medium">Tên của bạn</span>
                          }
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Hãy cho mình biết tên của bạn nhé! 😊",
                            },
                          ]}
                        >
                          <Input
                            prefix={<UserOutlined className="text-yellow" />}
                            className="h-12 rounded-xl bg-gray-50/50"
                            placeholder="Nhập tên của bạn"
                          />
                        </Form.Item>

                        <Form.Item
                          label={<span className="font-medium">Email</span>}
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Email là cần thiết đó! 📧",
                            },
                            {
                              type: "email",
                              message: "Email này chưa đúng format rồi!",
                            },
                          ]}
                        >
                          <Input
                            prefix={<MailOutlined className="text-yellow" />}
                            className="h-12 rounded-xl bg-gray-50/50"
                            placeholder="Email của bạn"
                          />
                        </Form.Item>
                      </div>

                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="h-12 bg-yellow hover:bg-yellow/90 text-black font-medium rounded-xl mt-4"
                      >
                        Cập nhật thông tin ✨
                      </Button>
                    </Form>
                  ) : (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Password Change Form */}
              <div className="bg-realWhite rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
                <div className="px-8 py-6 border-b border-gray-100">
                  <h2 className="text-2xl text-gray-800 flex items-center gap-3 font-heading">
                    <div className="w-10 h-10 bg-yellow/20 rounded-xl flex items-center justify-center">
                      <LockOutlined className="text-xl text-yellow" />
                    </div>
                    Đổi Mật Khẩu
                  </h2>
                </div>
                <div className="p-8">
                  {userData ? (
                    <Form
                      name="password"
                      layout="vertical"
                      onFinish={onChangePassword}
                    >
                      <Form.Item
                        label={
                          <span className="font-medium">Mật khẩu hiện tại</span>
                        }
                        name="oldPassword"
                        rules={[
                          {
                            required: true,
                            message: "Hãy nhập mật khẩu hiện tại nhé! 🔑",
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined className="text-yellow" />}
                          className="h-12 rounded-xl bg-gray-50/50"
                          placeholder="Nhập mật khẩu hiện tại"
                        />
                      </Form.Item>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          label={
                            <span className="font-medium">Mật khẩu mới</span>
                          }
                          name="newPassword"
                          rules={[
                            {
                              required: true,
                              message: "Hãy tạo mật khẩu mới nhé! 🔒",
                            },
                            {
                              min: 8,
                              message:
                                "Mật khẩu cần ít nhất 8 ký tự để an toàn hơn!",
                            },
                          ]}
                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-yellow" />}
                            className="h-12 rounded-xl bg-gray-50/50"
                            placeholder="Tạo mật khẩu mới"
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span className="font-medium">
                              Xác nhận mật khẩu
                            </span>
                          }
                          name="confirmPassword"
                          rules={[
                            {
                              required: true,
                              message:
                                "Hãy nhập lại mật khẩu mới một lần nữa! 🔄",
                            },
                          ]}
                        >
                          <Input.Password
                            prefix={<LockOutlined className="text-yellow" />}
                            className="h-12 rounded-xl bg-gray-50/50"
                            placeholder="Nhập lại mật khẩu mới"
                          />
                        </Form.Item>
                      </div>

                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="h-12 bg-yellow hover:bg-yellow/90 text-black font-medium rounded-xl mt-4"
                      >
                        Cập nhật mật khẩu 🔐
                      </Button>
                    </Form>
                  ) : (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
