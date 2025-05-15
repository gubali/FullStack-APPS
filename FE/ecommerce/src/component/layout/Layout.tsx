import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from '../../pages/header/Header'
const Layout = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export default Layout