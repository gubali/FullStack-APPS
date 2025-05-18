import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/AuthSlice";
import { useTranslation } from "react-i18next";
import i18n from "../../component/i18n/i18nConfig";
//import { RootState } from "../../store/type"; // Adjust the import path as needed
const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  interface AuthState {
    user: { userName: string, role: string } | null;
    isLoggedIn: boolean;
  }

  interface RootState {
    auth: AuthState;
  }
  const { user, isLoggedIn } = useSelector((state:RootState) => state.auth);
  console.log(user);
  console.log(isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          {t("tulipCart")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isLoggedIn && (
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between"
          >
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="dashboard">
                {t("products")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/add-product">
                {t("addProduct")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products">
               Product List
              </Nav.Link>
               <Nav.Link as={NavLink} to="/users">
               User List
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              <Navbar.Text className="me-3">
                {t("welcome")} {user?.userName || "Guest"}
              </Navbar.Text>
              <Nav.Link onClick={handleLogout}>
                <small style={{ color: "#fff" }}>{t("logout")}</small>
              </Nav.Link>
            </div>
          </Navbar.Collapse>
        )}
      </Container>
      <div style={{ display: "flex", color: "#fff", marginRight: "15px" }}>
        {t("languuage")}: &nbsp;
        <Nav.Link
          style={{ paddingRight: "5px" }}
          onClick={() => i18n.changeLanguage("en")}
        >
          <small style={{ color: "#fff" }}>en</small>
        </Nav.Link>
        <Nav.Link onClick={() => i18n.changeLanguage("fn")}>
          <small style={{ color: "#fff" }}>fr</small>
        </Nav.Link>
      </div>
    </Navbar>
  );
};

export default Header;
