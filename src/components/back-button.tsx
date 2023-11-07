import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();

    return (
        // <button onClick={handleBack}>Back</button>\
        <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
        </Button>
    )
}

export default BackButton