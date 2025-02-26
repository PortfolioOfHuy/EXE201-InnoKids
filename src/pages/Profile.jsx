import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  SaveOutlined,
  CloseOutlined,
  EditOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import {
  handleUserById,
  handleUpdateProfile,
  handleUserChangePassword,
} from "../services/user-service";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useUser } from "../contexts/UserContext";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState({
    avatar: "path/to/default-avatar.jpg",
    fullName: "",
    email: "",
    phone: "",
    membership: "",
    membershipDays: 0,
  });
  const { userId } = useParams();
  const { updateUser } = useUser();
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const getUserById = async () => {
      try {
        const user = await handleUserById(userId);
        setUserData(user.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    getUserById();
  }, [userId]);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    try {
      // Kiểm tra dữ liệu trước khi gửi
      if (!profile.fullName.trim()) {
        message.error("Vui lòng nhập họ và tên");
        return;
      }
      if (!profile.phone.trim()) {
        message.error("Vui lòng nhập số điện thoại");
        return;
      }

      // Hiển thị loading message
      const loadingMessage = message.loading("Đang cập nhật thông tin...", 0);

      const response = await handleUpdateProfile(
        userId,
        profile.fullName,
        profile.phone
      );

      if (response && response.data) {
        // Cập nhật lại thông tin người dùng
        const updatedUser = await handleUserById(userId);
        setUserData(updatedUser.data);

        // Cập nhật user context
        updateUser({
          FullName: profile.fullName,
          PhoneNumber: profile.phone,
        });

        loadingMessage();
        message.success("Cập nhật thông tin thành công!");
      }
    } catch (error) {
      // Hiển thị thông báo lỗi
      message.error(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin"
      );
    }
  };

  // Sửa lại hàm validate phone number
  const validatePhoneNumber = (phone) => {
    if (!phone) return false;
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/; // Bỏ flag /g
    return phoneRegex.test(phone);
  };

  // Sửa lại điều kiện disabled của button
  const isFormValid = () => {
    if (!userData) return true; // Disable khi chưa load xong data
    if (!profile.fullName.trim()) return true;
    if (!profile.phone.trim()) return true;
    if (!validatePhoneNumber(profile.phone)) return true;

    // Kiểm tra xem thông tin có thay đổi so với dữ liệu ban đầu không
    const isUnchanged =
      profile.fullName === userData.fullName &&
      profile.phone === userData.phoneNumber;

    return isUnchanged;
  };

  // Thêm hàm xử lý thay đổi họ tên
  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (newName.trim() === "") {
      message.warning("Họ và tên không được để trống");
    }
    setProfile({ ...profile, fullName: newName });
  };

  // Thêm hàm xử lý thay đổi số điện thoại
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    if (newPhone && !validatePhoneNumber(newPhone)) {
      message.warning("Số điện thoại không hợp lệ");
    }
    setProfile({ ...profile, phone: newPhone });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //TODO: API to change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      // Validate form
      if (!passwordForm.oldPassword) {
        message.error("Vui lòng nhập mật khẩu hiện tại");
        return;
      }
      if (!passwordForm.newPassword) {
        message.error("Vui lòng nhập mật khẩu mới");
        return;
      }
      if (!passwordForm.confirmPassword) {
        message.error("Vui lòng xác nhận mật khẩu mới");
        return;
      }
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        message.error("Mật khẩu xác nhận không khớp");
        return;
      }
      if (passwordForm.newPassword.length < 6) {
        message.error("Mật khẩu mới phải có ít nhất 6 ký tự");
        return;
      }
      if (passwordForm.oldPassword === passwordForm.newPassword) {
        message.error("Mật khẩu mới không được trùng với mật khẩu hiện tại");
        return;
      }

      // Show loading
      const loadingMessage = message.loading("Đang xử lý...", 0);

      const res = await handleUserChangePassword(
        userId,
        passwordForm.oldPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword
      );

      loadingMessage();

      if (res.status === 200) {
        message.success("Đổi mật khẩu thành công!");
        // Reset form
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        message.error(res.data || "Có lỗi xảy ra khi đổi mật khẩu");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        message.error("Mật khẩu hiện tại không chính xác");
      } else if (error.response?.status === 401) {
        message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        // Optional: Redirect to login page
      } else {
        message.error(
          error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu"
        );
      }
    }
  };

  useEffect(() => {
    if (userData) {
      setProfile({
        avatar: userData.avatar || "path/to/default-avatar.jpg",
        fullName: userData.fullName || "",
        email: userData.email || "",
        phone: userData.phoneNumber || "",
        membership: userData.membership || "Standard",
        membershipDays: userData.membershipDays || 0,
      });
    }
  }, [userData]);

  return (
    <div className="profile-page">
      <Container
        fluid
        className="py-5"
        style={{ background: "var(--bs-gray-100)" }}
      >
        <Container>
          {/* Profile Header */}
          <div
            className="text-center mb-5 p-4 rounded-4 shadow-sm position-relative"
            style={{
              background:
                "linear-gradient(135deg, var(--color-first) 0%, var(--color-second) 100%)",
            }}
          >
            <div className="position-relative mb-4">
              <div className="position-relative d-inline-block">
                <div
                  className="rounded-circle overflow-hidden border-4 border-white shadow"
                  style={{ width: 160, height: 160 }}
                >
                  <img
                    src="http://res.cloudinary.com/dp2faae1n/image/upload/v1739331343/swp391/yiipsyuf83lfuta4ejcv.jpg"
                    className="w-100 h-100 object-fit-cover"
                    alt="User Avatar"
                  />
                </div>
              </div>
            </div>
            <h2 className="text-white mb-2">
              {profile.fullName || "Chưa cập nhật"}
            </h2>
            <p className="text-white-50 mb-0">
              <MailOutlined className="me-2" />
              {profile.email}
            </p>
          </div>

          <Row className="g-4">
            {/* Left Column - Basic Info */}
            <Col lg={7}>
              <Card className="border-0 shadow-sm rounded-4 h-100">
                <Card.Header
                  className="bg-transparent py-4"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                >
                  <h5
                    className="mb-0 d-flex align-items-center"
                    style={{ color: "var(--color-first)" }}
                  >
                    <span
                      className="rounded-circle p-2 me-2"
                      style={{
                        background: "rgba(var(--color-first-rgb), 0.1)",
                      }}
                    >
                      <UserOutlined style={{ fontSize: "18px" }} />
                    </span>
                    Thông Tin Cá Nhân
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form>
                    <div className="mb-4">
                      <Form.Label
                        className="small fw-medium mb-2"
                        style={{ color: "var(--color-first)" }}
                      >
                        <UserOutlined className="me-2" />
                        Họ và Tên
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.fullName}
                        onChange={handleNameChange}
                        placeholder="Nhập họ và tên của bạn"
                        className="form-control-lg shadow-none"
                        style={{
                          background: "var(--bs-gray-100)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <Form.Label
                        className="small fw-medium mb-2"
                        style={{ color: "var(--color-first)" }}
                      >
                        <MailOutlined className="me-2" />
                        Email
                      </Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type="email"
                          value={profile.email}
                          disabled
                          className="form-control-lg shadow-none"
                          style={{
                            background: "var(--bs-gray-100)",
                            border: "1px solid rgba(0,0,0,0.05)",
                          }}
                        />
                        <Button
                          variant="light"
                          className="px-4"
                          style={{
                            background: "var(--bs-gray-100)",
                            borderLeft: "none",
                            color: "var(--color-second)",
                          }}
                        >
                          <EditOutlined />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Form.Label
                        className="small fw-medium mb-2"
                        style={{ color: "var(--color-first)" }}
                      >
                        <PhoneOutlined className="me-2" />
                        Số Điện Thoại
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        value={profile.phone}
                        onChange={handlePhoneChange}
                        placeholder="Nhập số điện thoại của bạn"
                        className="form-control-lg shadow-none"
                        style={{
                          background: "var(--bs-gray-100)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      />
                    </div>

                    <div className="text-end">
                      <Button
                        onClick={handleUpdateInfo}
                        className="btn-lg px-5 rounded-3"
                        style={{
                          background: "var(--color-second)",
                          border: "none",
                          transition: "all 0.3s ease",
                        }}
                        disabled={isFormValid()}
                      >
                        <SaveOutlined className="me-2" />
                        Cập Nhật Thông Tin
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column - Password Change */}
            <Col lg={5}>
              <Card className="border-0 shadow-sm rounded-4 h-100">
                <Card.Header
                  className="bg-transparent py-4"
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                >
                  <h5
                    className="mb-0 d-flex align-items-center"
                    style={{ color: "var(--color-first)" }}
                  >
                    <span
                      className="rounded-circle p-2 me-2"
                      style={{
                        background: "rgba(var(--color-first-rgb), 0.1)",
                      }}
                    >
                      <LockOutlined style={{ fontSize: "18px" }} />
                    </span>
                    Đổi Mật Khẩu
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form>
                    <div className="mb-4">
                      <Form.Label
                        className="small fw-medium mb-2"
                        style={{ color: "var(--color-first)" }}
                      >
                        <LockOutlined className="me-2" />
                        Mật Khẩu Hiện Tại
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="oldPassword"
                        value={passwordForm.oldPassword}
                        onChange={handlePasswordChange}
                        placeholder="Nhập mật khẩu hiện tại"
                        className="form-control-lg shadow-none"
                        style={{
                          background: "var(--bs-gray-100)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <Form.Label
                        className="small fw-medium mb-2"
                        style={{ color: "var(--color-first)" }}
                      >
                        <LockOutlined className="me-2" />
                        Mật Khẩu Mới
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Nhập mật khẩu mới"
                        className="form-control-lg shadow-none"
                        style={{
                          background: "var(--bs-gray-100)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <Form.Label
                        className="small fw-medium mb-2"
                        style={{ color: "var(--color-first)" }}
                      >
                        <LockOutlined className="me-2" />
                        Xác Nhận Mật Khẩu
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Nhập lại mật khẩu mới"
                        className="form-control-lg shadow-none"
                        style={{
                          background: "var(--bs-gray-100)",
                          border: "1px solid rgba(0,0,0,0.05)",
                        }}
                      />
                    </div>

                    <div className="d-grid gap-2">
                      <Button
                        onClick={handleChangePassword}
                        className="btn-lg rounded-3"
                        style={{
                          background: "var(--color-second)",
                          border: "none",
                          transition: "all 0.3s ease",
                        }}
                        disabled={
                          !passwordForm.oldPassword ||
                          !passwordForm.newPassword ||
                          !passwordForm.confirmPassword
                        }
                      >
                        <LockOutlined className="me-2" />
                        Đổi Mật Khẩu
                      </Button>
                      <Button
                        variant="light"
                        className="btn-lg rounded-3"
                        style={{ transition: "all 0.3s ease" }}
                        onClick={() =>
                          setPasswordForm({
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          })
                        }
                      >
                        <CloseOutlined className="me-2" />
                        Hủy
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default Profile;
