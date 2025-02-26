import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { UserProvider } from "./contexts/UserContext";
import { jwtDecode } from "jwt-decode";
import DoctorHeader from "./components/layout/DoctorHeader";

function App() {
  let user = null;
  const token = localStorage.getItem("token");

  if (token) {
    try {
      user = jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
    }
  }

  return (
    <UserProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {user?.Role === "Doctor" ? <DoctorHeader /> : <Header />}

        <main
          style={{
            paddingTop: "70px",
            flex: 1,
            overflowY: "auto",
            position: "relative",
          }}
        >
          <Outlet />
          <Footer />
        </main>

        {/* Add ToastContainer here */}
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
          theme="colored"
          transition={Bounce}
        />
      </div>
    </UserProvider>
  );
}

export default App;
