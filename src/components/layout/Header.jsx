import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faTag,
  faBookOpen,
  faEnvelope,
  faUser,
  faSignOutAlt,
  faChild,
  faCog,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../contexts/UserContext";
import { message } from "antd";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    try {
      logout();
      navigate("/signin");
      message.success("Đăng xuất thành công");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getNavItems = () => {
    const items = [
      { to: "/", icon: faHome, text: "Trang chủ" },
      { to: "/features", icon: faChartLine, text: "Tính năng" },
      { to: "/pricing", icon: faTag, text: "Bảng giá" },
      { to: "/contact", icon: faEnvelope, text: "Tư vấn" },
    ];

    if (user) {
      items.splice(3, 0, {
        to: `/blog/${user.Id}`,
        icon: faBookOpen,
        text: "Blog",
      });
    }

    return items;
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="d-flex align-items-center"
      style={{
        color: "var(--color-first)",
        textDecoration: "none",
        padding: "8px 16px",
        borderRadius: "8px",
        transition: "all 0.3s ease",
      }}
    >
      <FontAwesomeIcon icon={faUser} className="me-2" />
      {children}
    </a>
  ));

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="shadow-sm"
      style={{ backgroundColor: "white" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span style={{ color: "var(--color-first)", fontWeight: "600" }}>
            GrowthTrack
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {getNavItems().map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link d-flex align-items-center mx-2 position-relative"
                style={{
                  color: isActive(item.to)
                    ? "var(--color-second)"
                    : "var(--color-first)",
                  fontWeight: "500",
                  padding: "8px 16px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-second)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.to)) {
                    e.currentTarget.style.color = "var(--color-first)";
                  }
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                {item.text}
              </Link>
            ))}
          </Nav>

          <Nav>
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-custom-components"
                >
                  {user.FullName || "Tài khoản"}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    padding: "8px",
                    borderRadius: "12px",
                    border: "1px solid #eee",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <Dropdown.Item
                    as={Link}
                    to={`/profile/${user.Id}`}
                    className="rounded-2 mb-1"
                  >
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Thông tin cá nhân
                  </Dropdown.Item>

                  <Dropdown.Item
                    as={Link}
                    to={`/children/${user.Id}`}
                    className="rounded-2 mb-1"
                  >
                    <FontAwesomeIcon icon={faChild} className="me-2" />
                    Quản lý trẻ em
                  </Dropdown.Item>

                  <Dropdown.Item
                    as={Link}
                    to={`/history-payment/${user.Id}`}
                    className="rounded-2 mb-1"
                  >
                    <FontAwesomeIcon icon={faMoneyBill} className="me-2" />
                    Lịch sử thanh toán
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item
                    onClick={handleLogout}
                    className="rounded-2 text-danger"
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link
                to="/signin"
                className="btn"
                style={{
                  backgroundColor: "var(--color-first)",
                  color: "white",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-second)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-first)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Đăng nhập
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
