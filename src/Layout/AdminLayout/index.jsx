import { useState } from "react";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChalkboardTeacher,
  faUsers,
  faBook,
  faChartLine,
  faBars,
  faSignOutAlt,
  faUser,
  faCog,
  faBell,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../redux/features/counterSlice";

const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const menuItems = [
    {
      key: "/admin",
      icon: <FontAwesomeIcon icon={faHome} />,
      label: "Tổng quan",
    },
    {
      key: "/admin/staff",
      icon: <FontAwesomeIcon icon={faUserTie} />,
      label: "Quản lý nhân viên",
    },
    {
      key: "/admin/teachers",
      icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
      label: "Quản lý giảng viên",
    },
    {
      key: "/admin/students",
      icon: <FontAwesomeIcon icon={faUsers} />,
      label: "Quản lý học viên",
    },
    {
      key: "/admin/courses",
      icon: <FontAwesomeIcon icon={faBook} />,
      label: "Quản lý khóa học",
    },
    {
      key: "/admin/statistics",
      icon: <FontAwesomeIcon icon={faChartLine} />,
      label: "Báo cáo & Thống kê",
    },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <FontAwesomeIcon icon={faUser} className="text-gray-400" />,
      label: "Thông tin cá nhân",
    },
    {
      key: "settings",
      icon: <FontAwesomeIcon icon={faCog} className="text-gray-400" />,
      label: "Cài đặt hệ thống",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <FontAwesomeIcon icon={faSignOutAlt} className="text-red-400" />,
      label: "Đăng xuất",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/login");
    } else if (key === "profile") {
      navigate("/admin/profile");
    } else if (key === "settings") {
      navigate("/admin/settings");
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-purple shadow-lg"
        width={280}
      >
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-3">
            {!collapsed && (
              <span className="text-2xl font-bold text-white">INNOKIDS</span>
            )}
          </Link>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none py-4 bg-transparent"
          theme="dark"
        />
      </Sider>

      <Layout>
        <Header className="bg-white px-6 flex items-center justify-between shadow-sm h-16">
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faBars} />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-lg hover:bg-gray-100 w-10 h-10"
            />
            <h1 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.key === location.pathname)
                ?.label || "Tổng quan"}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Notifications */}
            <Button
              type="text"
              icon={<FontAwesomeIcon icon={faBell} />}
              className="text-lg hover:bg-gray-100 w-10 h-10"
            />

            {/* User Menu */}
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 py-2 px-3 rounded-lg transition-colors">
                <div className="hidden md:block">
                  <p className="text-sm text-gray-500">Quản trị viên</p>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="p-6 bg-gray-50">
          <div className="bg-white rounded-xl p-6 min-h-full shadow-sm">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
