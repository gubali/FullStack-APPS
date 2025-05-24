import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { useTranslation } from "react-i18next";
import i18n from "../../component/i18n/i18nConfig";
import type { RootState } from "../../store/Store";
import "./header.css";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { cartCount } = useSelector((state: RootState) => state.cart);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="py-2">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" className="fw-bold text-white">
            {t("tulipCart")}
          </Navbar.Brand>

          {/* Custom Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Desktop Nav */}
          <div className="d-none d-lg-flex ms-auto align-items-center gap-3">
            {isLoggedIn && (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/dashboard">
                  {t("dashboard")}
                </Nav.Link>
                {user?.role === "admin" && (
                  <>
                    <Nav.Link as={NavLink} to="/add-product">
                      {t("addProduct")}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products-list">
                      {t("products")}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/users-list">
                      {t("userList")}
                    </Nav.Link>
                  </>
                )}
              </Nav>
            )}

            {isLoggedIn && (
              <>
                <div className="position-relative">
                  <span role="img" aria-label="bell" style={{ fontSize: "24px" }}>
                    🔔
                  </span>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "12px", zIndex: 1 }}>
                      {cartCount}
                    </span>
                  )}
                </div>
                <Navbar.Text className="text-white">
                  {t("welcome")} <strong>{user?.userName || "Guest"}</strong>
                </Navbar.Text>
                <Nav.Link onClick={handleLogout} className="p-0">
                  <small className="text-white">{t("logout")}</small>
                </Nav.Link>
              </>
            )}

            <div className="d-flex align-items-center gap-2">
              <span className="text-white">{t("language")}:</span>
              <Nav.Link onClick={() => i18n.changeLanguage("en")} className="p-0">
                <small className="text-white">en</small>
              </Nav.Link>
              <Nav.Link onClick={() => i18n.changeLanguage("fn")} className="p-0">
                <small className="text-white">fr</small>
              </Nav.Link>
            </div>
          </div>
        </Container>
      </Navbar>

      {/* Mobile Side Drawer */}
      {menuOpen && (
        <div className="drawer-backdrop" onClick={closeMenu} role="presentation" />
      )}

      <div className={`side-drawer ${menuOpen ? "open" : ""}`}>
        <nav className="side-drawer-content" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button className="close-btn" onClick={closeMenu} aria-label="Close menu">
            &times;
          </button>

          <Nav className="flex-column">
            {isLoggedIn && (
              <>
                <Nav.Link as={NavLink} to="/dashboard">
                  {t("dashboard")}
                </Nav.Link>
                {user?.role === "admin" && (
                  <>
                    <Nav.Link as={NavLink} to="/add-product">
                      {t("addProduct")}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products-list">
                      {t("products")}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/users-list">
                      {t("userList")}
                    </Nav.Link>
                  </>
                )}
                <Nav.Link onClick={handleLogout}>
                  {t("logout")}
                </Nav.Link>
              </>
            )}
            <Nav.Link disabled>
              {t("welcome")} <strong>{user?.userName || "Guest"}</strong>
            </Nav.Link>
            <div className="language-selector">
              <span>{t("language")}:</span>
              <Nav.Link onClick={() => i18n.changeLanguage("en")} className="p-0">
                <small>EN</small>
              </Nav.Link>
              <Nav.Link onClick={() => i18n.changeLanguage("fn")} className="p-0">
                <small>FR</small>
              </Nav.Link>
            </div>
          </Nav>
        </nav>
      </div>
    </>
  );
};

export default Header;
