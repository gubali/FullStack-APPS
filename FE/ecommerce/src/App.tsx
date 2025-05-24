import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Layout from "./component/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProduct from "./pages/product/add-product/AddProduct";
import { useSelector } from "react-redux";
import "./component/i18n/i18nConfig";
import ProductList from "./pages/product/product-list/ProductList";
import UserList from "./user/user-list/UserList";
import { ToastProvider } from "./component/toast/ToastProvider";
import type { RootState } from "./store/type";

function App() {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />

            {isLoggedIn && <Route path="dashboard" element={<Dashboard />} />}

            {isLoggedIn && user?.role === "admin" && (
              <>
                <Route path="add-product" element={<AddProduct />} />
                <Route path="products-list" element={<ProductList user={{ role: "admin" }} />} />
                <Route path="users-list" element={<UserList user={{ role: "admin" }} />} />
              </>
            )}

            {isLoggedIn && user?.role === "user" && (
              <>
                <Route path="products" element={<ProductList user={{ role: "user" }} />} />
                <Route path="*" element={<Navigate to="/products" />} />
              </>
            )}

            {!isLoggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
