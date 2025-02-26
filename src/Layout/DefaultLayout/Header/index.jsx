import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faUserCircle,
  faSchool,
  faMessage,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../../redux/features/counterSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Badge, Dropdown } from "antd";
import { message } from "antd";
import { handleGetPendingCourse } from "../../../services/user-service";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const menuItems = useMemo(
    () => [
      { title: "Khóa học", path: "/courses", highlight: true },
      { title: "Về InnoKids", path: "/about" },
      { title: "Blog", path: "/blog" },
      { title: "Liên hệ", path: "/contact" },
    ],
    []
  );

  useEffect(() => {
    const getCartCount = async () => {
      try {
        if (user) {
          const response = await handleGetPendingCourse(user.Id);
          setCartCount(Array.isArray(response) ? response.length : 0);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0);
      }
    };

    getCartCount();
  }, [user]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate]);

  const handleProtected = useCallback(
    (e) => {
      if (!user) {
        e.preventDefault();
        message.warning("Để có quyền truy cập, vui lòng đăng nhập!");
        navigate("/login");
      }
    },
    [user, navigate]
  );

  const userMenuItems = useMemo(
    () => [
      {
        key: "profile",
        label: (
          <Link to={`/profile/${user?.Id}`} className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserCircle} className="text-gray-400" />
            <span>Thông tin tài khoản</span>
          </Link>
        ),
      },
      {
        key: "register-teacher",
        label: (
          <Link
            to="/register-teacher"
            className="text-gray-700 hover:text-yellow transition-colors"
          >
            Trở thành giảng viên
          </Link>
        ),
      },
      {
        key: "logout",
        label: (
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500"
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Đăng xuất</span>
          </div>
        ),
      },
    ],
    [user, handleLogout]
  );

  const UserDropdown = () => (
    <Dropdown
      menu={{ items: userMenuItems }}
      placement="bottomRight"
      trigger={["click"]}
      overlayClassName="w-56"
    >
      <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-yellow transition-colors">
        <FontAwesomeIcon icon={faUser} />
        <span className="text-sm font-medium">{user.Username}</span>
      </div>
    </Dropdown>
  );

  const NavigationLinks = () => (
    <>
      {menuItems.slice(0, 2).map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${
            item.highlight
              ? "bg-yellow hover:bg-yellow/90 px-4 py-2 rounded-xl text-black font-semibold transition-all transform hover:scale-105"
              : "text-gray-700 hover:text-yellow transition-colors"
          } text-base font-medium`}
        >
          {item.title}
        </Link>
      ))}
    </>
  );

  const MobileMenu = () => (
    <div className="lg:hidden fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className="absolute top-20 left-0 right-0 bg-white shadow-xl animate-slide-down">
        <div className="max-w-7xl mx-auto">
          {user && (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow/20 to-yellow/5" />
              <div className="px-6 py-5 flex items-center space-x-4 relative">
                <div className="h-12 w-12 rounded-full bg-yellow/20 flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-2xl text-yellow"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {user.name || "Người dùng"}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  item.highlight
                    ? "bg-yellow text-black hover:bg-yellow/90"
                    : "text-gray-700 hover:bg-gray-50"
                } block px-4 py-3 rounded-xl text-base font-medium transition-all my-1`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {user && (
              <>
                <div className="h-px bg-gray-100 my-3" />
                <div className="space-y-1">
                  <Link
                    to="/my-courses"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon
                      icon={faSchool}
                      className="w-5 h-5 text-gray-400"
                    />
                    <span className="ml-3 font-medium">Khóa học của tôi</span>
                  </Link>

                  {user.Role === "Customer" && (
                    <Link
                      to="/register-teacher"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        className="w-5 h-5 text-gray-400"
                      />
                      <span className="ml-3 font-medium">
                        Trở thành giảng viên
                      </span>
                    </Link>
                  )}

                  {user.Role === "Instructor" && (
                    <Link
                      to="/teacherDash"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FontAwesomeIcon
                        icon={faSchool}
                        className="w-5 h-5 text-gray-400"
                      />
                      <span className="ml-3 font-medium">Quản lý khóa học</span>
                    </Link>
                  )}

                  <Link
                    to={`/profile/${user.Id}`}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="w-5 h-5 text-gray-400"
                    />
                    <span className="ml-3 font-medium">
                      Thông tin tài khoản
                    </span>
                  </Link>
                </div>

                <div className="px-4 py-4">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-all gap-2 border border-red-100"
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="w-5 h-5"
                    />
                    Đăng xuất
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 lg:px-6">
          <div className="h-20 flex items-center justify-between">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1">
              <NavigationLinks />
            </nav>

            {/* Center Logo */}
            <div className="flex-shrink-0 flex items-center justify-center transform hover:scale-105 transition-all">
              <Link to="/" className="block">
                <img src="/Logo.png" alt="InnoKids" className="h-14 w-auto" />
              </Link>
            </div>

            {/* Right Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-end">
              {user ? (
                <div className="flex items-center space-x-4">
                  {user.Role === "Customer" && (
                    <>
                      <Link to={`/cart/${user.Id}`}>
                        <Badge count={cartCount} size="small">
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            className="text-gray-700 hover:text-yellow transition-colors"
                          />
                        </Badge>
                      </Link>
                      <Link
                        to={`/my-courses/${user.Id}`}
                        className="text-gray-700 hover:text-yellow transition-colors"
                      >
                        Khóa học của tôi
                      </Link>
                    </>
                  )}

                  {user.Role === "Instructor" && (
                    <Link
                      to="/teacherDash"
                      className="text-gray-700 hover:text-yellow transition-colors"
                    >
                      Quản lý khóa học
                    </Link>
                  )}

                  <Link
                    to={`/tin-nhan/${user.Id}`}
                    className="text-gray-700 hover:text-yellow transition-colors"
                  >
                    <FontAwesomeIcon icon={faMessage} />
                  </Link>

                  <UserDropdown />
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-gray-700 hover:text-yellow transition-colors"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Đăng nhập</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-yellow hover:bg-yellow/90 px-4 py-2 rounded-xl text-black font-semibold transition-all transform hover:scale-105"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <Link
                to={user ? `/cart/${user.Id}` : "/login"}
                onClick={handleProtected}
                className="relative transform hover:scale-110 transition-all"
              >
                <Badge count={user ? cartCount : 0} size="small">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-gray-700 hover:text-yellow text-lg transition-colors"
                  />
                </Badge>
              </Link>
              <button
                className="lg:hidden text-gray-700 hover:text-yellow"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu />}
    </header>
  );
}

export default Header;
