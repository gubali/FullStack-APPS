import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../../pages/header/Header";
import Footer from "../../pages/footer/Footer";
const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
