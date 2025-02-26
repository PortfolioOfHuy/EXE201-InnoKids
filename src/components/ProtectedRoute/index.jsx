import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { message } from "antd";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector(selectUser);

  if (!user) {
    message.warning("Vui lòng đăng nhập để tiếp tục!");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.Role)) {
    message.error("Bạn không có quyền truy cập trang này!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
