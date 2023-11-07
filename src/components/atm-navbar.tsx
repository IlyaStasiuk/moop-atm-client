import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDeauth } from "../utils/requests/auth";


function AtmNavbar() {
    const deauth = useDeauth();
    const navigate = useNavigate();

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>ATM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/home')}>Home</Nav.Link>
                    </Nav>
                    <Button variant="outline-danger" onClick={deauth}>Log Out</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AtmNavbar;