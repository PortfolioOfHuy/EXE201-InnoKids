import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { store, persistor } from "./redux/store";
import { DefaultLayout } from "./Layout";
import { publicRoutes, privateRoutes } from "./routes";
import { Spin } from "antd";
import MyCourse from "./pages/MyCourse";
import AdminLayout from "./Layout/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/Admin/Dashboard";
import TeacherManagement from "./pages/Admin/TeacherManagement";
import StudentManagement from "./pages/Admin/StudentManagement";
import CourseManagement from "./pages/Admin/CourseManagement";
import Statistics from "./pages/Admin/Statistics";
import StaffManagement from "./pages/Admin/StaffManagement";

function App() {
  const renderRoutes = (routes, isPrivate = false) => {
    return routes.map((route, index) => {
      const Page = route.component;
      let Layout = route.layout || DefaultLayout;

      if (route.layout === null) {
        Layout = Fragment;
      }

      return (
        <Route
          key={`${isPrivate ? "private" : "public"}-${index}`}
          path={route.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      );
    });
  };

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="h-screen w-screen flex items-center justify-center bg-background-color">
            <Spin size="large" />
          </div>
        }
        persistor={persistor}
      >
        <BrowserRouter>
          <div className="min-h-screen bg-background-color font-body">
            {/* Main Content */}
            <div className="flex flex-col min-h-screen">
              <Routes>
                {renderRoutes(publicRoutes)}
                {renderRoutes(privateRoutes, true)}
                {/* Admin Routes */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={["Admin"]}>
                      <AdminLayout>
                        <Routes>
                          <Route path="/" element={<AdminDashboard />} />
                          <Route path="/staff" element={<StaffManagement />} />
                          <Route
                            path="/teachers"
                            element={<TeacherManagement />}
                          />
                          <Route
                            path="/students"
                            element={<StudentManagement />}
                          />
                          <Route
                            path="/courses"
                            element={<CourseManagement />}
                          />
                          <Route path="/statistics" element={<Statistics />} />
                        </Routes>
                      </AdminLayout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
