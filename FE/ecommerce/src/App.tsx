import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/login";
import Layout from "./component/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import AddProduct from "./pages/product/add-product/AddProduct";
import { useSelector } from "react-redux";
import "./component/i18n/i18nConfig";
import ProductList from "./pages/product/product-list/ProductList";
interface RootState {
  auth: {
    isLoggedIn: boolean;
  };
}

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Default route to either login or dashboard */}
            <Route
              index
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
            />

            {/* Protected routes */}
            <Route
              path="dashboard"
              element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/add-product"
              element={isLoggedIn ? <AddProduct /> : <Navigate to="/" />}
            />
            <Route
              path="/products"
              element={
                isLoggedIn ? (
                  <ProductList
                    user={{
                      role: "admin",
                    }}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
