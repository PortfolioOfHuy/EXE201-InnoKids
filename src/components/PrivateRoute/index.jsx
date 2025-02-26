import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/counterSlice';
import { message } from 'antd';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    message.warning('Vui lòng đăng nhập để trở thành giảng viên!');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute; 