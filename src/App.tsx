import { Routes, Route } from "react-router-dom";
import { NavBar } from "./Component/NavBar.tsx";
import { Home } from "./Component/Home.tsx";
import { Cards } from "./Component/Cards.tsx";
import LoginPage from "./Pages/Login.tsx";
import Dashboard from "./Component/Dashboard.tsx";
import ProtectedRoute from "./Component/protectRoute.tsx";
import Footer from "./Component/Footer.tsx";
import AdminLogin from "./Pages/AdminLogin.tsx";
import AdminDashboard from "./Pages/AdminDashboard.tsx";
import AdminProtectedRoute from "./Component/AdimProtectedRoute.tsx";


// Home page layout (Navbar + Home banner + Cards preview)
const HomePage = () => (
  <div className="flex flex-col min-h-screen">
    <div className="flex-1">
      <NavBar />
      <Home />
      <Cards />
    </div>
    <Footer />
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
