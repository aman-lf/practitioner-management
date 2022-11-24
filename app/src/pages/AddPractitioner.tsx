import { useState } from "react";
import { Toast } from "react-bootstrap";

import { addPractitioner } from "../api/api";
import IPractitioner from "../interfaces/practitioner";
import PractitionerForm from "./components/PractitionerForm";

export default function AddPractitioner() {
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (practitioner: IPractitioner, image: File) => {
        addPractitioner(practitioner, image).then((res) => {
            setShowToast(true);
        });
    };

    return (
        <div>
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                className="p-3 m-3 ms-auto bg-success position-top-right"
                delay={5000}
                autohide
            >
                <Toast.Header className="bg-success text-white">
                    <span className="me-auto">New Practitioner created!</span>
                </Toast.Header>
            </Toast>

            <PractitionerForm handleSubmit={handleSubmit} title="Add Practitioner" />
        </div>
    );
}
