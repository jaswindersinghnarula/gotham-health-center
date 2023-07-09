import { Route, Routes } from "react-router-dom";
import LoginPage from "./authPages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminHome from "./admin/AdminHome";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Paths */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/home" element={<AdminHome />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
