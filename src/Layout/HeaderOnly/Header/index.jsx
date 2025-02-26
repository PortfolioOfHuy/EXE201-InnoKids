import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faCartShopping,
  faUserCircle,
  faSchool,
  faMessage,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../../redux/features/counterSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white h-12 flex items-center w-full">
      <div className="flex justify-between w-full px-5">
        <div className="flex items-center justify-between gap-8">
          <a href="#" className="bg-yellow px-2 py-1 rounded-md">
            Khóa học
          </a>
          <a href="#">Về InnoKids</a>
          <a href="#">Blog</a>
          <a href="#">Liên hệ</a>
        </div>
        <div className="w-16 flex items-center">
          <a href="/">
            <img src="/Logo.png" alt="InnoKids" />
          </a>
        </div>

        {user ? (
          <div className="flex items-center justify-between gap-7">
            <a href="#">Khóa học của tôi</a>
            {/* Dropdown */}
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 w-full rounded-md bg-white px-4 py-2 text-sm hover:bg-background-color"
                onClick={toggleMenu}
              >
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faAddressCard} />
                  <span>Profile</span>
                </div>
                <svg
                  className="-mr-1 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                </svg>
              </button>
              {/* Dropdown menu */}
              {isOpen && (
                <div
                  className="absolute right-0 z-20 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/10 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-background-color-cover"
                      role="menuitem"
                    >
                      <FontAwesomeIcon icon={faUserCircle} />
                      <span>Thông tin tài khoản</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-background-color-cover"
                      role="menuitem"
                    >
                      <FontAwesomeIcon icon={faSchool} />
                      <span>Lịch Liveclass</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-background-color-cover"
                      role="menuitem"
                    >
                      <FontAwesomeIcon icon={faMessage} />
                      <span>Tin nhắn</span>
                    </a>
                    <button
                      type="button"
                      className="flex items-center gap-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-100 hover:text-red-700"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <a href="#">
              <FontAwesomeIcon
                className="text-background-color-cover"
                icon={faMagnifyingGlass}
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="text-background-color-cover"
                icon={faCartShopping}
              />
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-8">
            <a href="#">Khóa học của tôi</a>
            <a href="/login" className="flex items-center gap-2">
              <FontAwesomeIcon
                className="text-background-color-cover"
                icon={faUser}
              />
              <span>Đăng nhập</span>
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="text-background-color-cover"
                icon={faMagnifyingGlass}
              />
            </a>
            <a href="#">
              <FontAwesomeIcon
                className="text-background-color-cover"
                icon={faCartShopping}
              />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
