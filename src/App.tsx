import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import UsersPage from "./pages/users/UsersPage";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
