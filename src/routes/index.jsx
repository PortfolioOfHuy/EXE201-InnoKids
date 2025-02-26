import Chat from "../pages/Chat";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProfilePage from "../pages/Profile";
import Register from "../pages/Register";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Course from "../pages/Course";
import CourseDetail from "../pages/CourseDetail";
import TeacherDashboard from "../pages/TeacherDashboard";
import Cart from "../pages/Cart";
import MyCourse from "../pages/MyCourse";
import RegisterTeacher from "../pages/RegisterTeacher";
import PaymentSuccess from "../pages/Payment";

// Routes công khai - ai cũng xem được
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/blog", component: Blog },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
  { path: "/courses", component: Course },
  { path: "/course-detail/:id", component: CourseDetail },
  { path: "/payment-success", component: PaymentSuccess, layout: null },
];

// Routes yêu cầu đăng nhập
const privateRoutes = [
  // Routes cho Customer
  {
    path: "/cart/:userId",
    component: Cart,
    allowedRoles: ["Customer"],
  },
  {
    path: "/my-courses/:userId",
    component: MyCourse,
    allowedRoles: ["Customer"],
  },
  {
    path: "/register-teacher",
    component: RegisterTeacher,
    allowedRoles: ["Customer"],
  },

  // Routes cho Instructor
  {
    path: "/teacherDash",
    component: TeacherDashboard,
    allowedRoles: ["Instructor"],
  },

  // Routes chung cho cả Customer và Instructor
  {
    path: "/profile/:userId",
    component: ProfilePage,
    allowedRoles: ["Customer", "Instructor"],
  },
  {
    path: "/tin-nhan/:userId",
    component: Chat,
    allowedRoles: ["Customer", "Instructor"],
  },
];

export { publicRoutes, privateRoutes };
