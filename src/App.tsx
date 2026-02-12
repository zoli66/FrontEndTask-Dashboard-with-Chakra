// import "./App.css";
import LoginPage from "./pages/auth/LoginPage";
import UsersPage from "./pages/users/listUsers/UsersPage";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardLayout from "./layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ProductsPage from "./pages/products/productList/ProductsPage";
import ProductPage from "./pages/products/product/ProductPage";
import UserPage from "./pages/users/user/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product" element={<ProductPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
