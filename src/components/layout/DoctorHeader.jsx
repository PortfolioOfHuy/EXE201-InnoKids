import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartLine,
  faTag,
  faBookOpen,
  faEnvelope,
  faUser,
  faStethoscope,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { useUser } from "../../contexts/UserContext";
const DoctorHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path;
  
    const { user } = useUser();
  
    const handleLogout = () => {
      try {
        localStorage.removeItem("token");
        localStorage.clear();
        message.success("Đăng xuất thành công");
        navigate("/signin");
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
  
  return (
    <div>
       <Navbar
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        padding: "12px 0",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Container>
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center"
          style={{ gap: "8px" }}
        >
          <div style={{ lineHeight: "1.2" }}>
            <div
              style={{
                color: "var(--color-first)",
                fontSize: "24px",
                fontWeight: "700",
                letterSpacing: "-0.5px",
              }}
            >
              Growth<span style={{ color: "var(--color-second)" }}>Track</span>
            </div>
          </div>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="mx-auto">
            {[
              { to: "/", icon: faHome, text: "Trang chủ" },
              { to: "/dfdf", icon: faStethoscope, text: "Dashboard" },
              { to: "/dfdf", icon: faUserMd, text: "Bệnh nhân" },
              { to: "/blog", icon: faBookOpen, text: "Blog" },
              { to: "/appoinment", icon: faEnvelope, text: "Tư vấn" },
            ].map((item) => (
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
                <FontAwesomeIcon
                  icon={item.icon}
                  className="me-2"
                  style={{ fontSize: "14px" }}
                />
                {item.text}
                {isActive(item.to) && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "16px",
                      right: "16px",
                      height: "2px",
                      background:
                        "linear-gradient(to right, var(--color-second), var(--color-first))",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </Link>
            ))}
          </Nav>

          {/* Auth Section */}
          <div className="d-flex gap-3">
            {user ? (
              <NavDropdown
                title={
                  <>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="me-2"
                      style={{ fontSize: "14px", color: "var(--color-second)" }}
                    />
                    {user.FullName}
                  </>
                }
                id="basic-nav-dropdown"
                align="end"
                style={{
                  color: "var(--color-first)",
                  fontWeight: "500",
                  padding: "8px 16px",
                }}
              >
                <NavDropdown.Item
                  as={Link}
                  to={`/profile/${user.Id}`}
                  style={{ color: "var(--color-first)" }}
                >
                  Bảng điều khiển
                </NavDropdown.Item>
                
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  style={{ color: "var(--color-danger)" }}
                >
                  Đăng xuất 
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="btn"
                  style={{
                    color: "var(--color-first)",
                    borderColor: "var(--color-first)",
                    fontWeight: "500",
                    padding: "8px 24px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Đăng nhập nè
                </Link>
                <Link
                  to="/signup"
                  className="btn"
                  style={{
                    backgroundColor: "var(--color-first)",
                    fontWeight: "500",
                    color: "white",
                    padding: "8px 24px",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default DoctorHeader
