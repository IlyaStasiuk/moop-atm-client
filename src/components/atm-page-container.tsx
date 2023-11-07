import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDeauth } from "../utils/requests/auth";
import AtmNavbar from "./atm-navbar";

interface AtmPageContainerProps {
    header: string,
    navbar?: boolean,
}

function AtmPageContainer(props: React.PropsWithChildren<AtmPageContainerProps>) {
    const deauth = useDeauth();
    const navigate = useNavigate();

    return (
        <div>
            {props.navbar && <AtmNavbar />}
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <h1>{props.header}</h1>
                {props.children}
            </Container>
        </div>
    );
}

export default AtmPageContainer;