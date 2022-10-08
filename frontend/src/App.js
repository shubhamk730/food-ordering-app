import { Route, Routes } from "react-router-dom";
import "./App.css";
import Logout from "./components/Auth/Logout";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminHome from "./pages/Admin/AdminHome";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import HomePage from "./pages/User/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} exact />
      <Route path="/logout" element={<Logout />} exact />
      <Route path="/admin/login" element={<Login />} exact />
      <Route path="/signup" element={<Signup />} exact />
      <Route element={<PrivateRoutes />}>
        <Route element={<AdminHome />} path="/admin/" exact />
        <Route element={<HomePage />} path="/" exact />
      </Route>
    </Routes>
  );
}

export default App;
