import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toast } from "react-bootstrap";

import PractitionerForm from "./components/PractitionerForm";
import { getPractitioner, updatePractitioner } from "../api/api";
import IPractitioner from "../interfaces/practitioner";

export default function UpdatePractitioner() {
    const [practitioner, setPractitioner] = useState<IPractitioner | null>();
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getPractitioner(id).then((res) => {
            setPractitioner(res.data.data);
        });
    }, [id]);

    const handleSubmit = (practitioner: IPractitioner, image: File) => {
        updatePractitioner(id, practitioner, image).then((res) => {
            setShowToast(true);
        });
    };

    return (
        <div>
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                // position="top-end"
                className="p-3 m-3 ms-auto bg-success position-top-right"
                delay={50000}
                autohide
            >
                <Toast.Header className="bg-success text-white">
                    <span className="me-auto">Practitioner updated!</span>
                </Toast.Header>
            </Toast>

            {practitioner ? (
                <PractitionerForm
                    handleSubmit={handleSubmit}
                    data={practitioner}
                    title="Update Practitioner"
                />
            ) : null}
        </div>
    );
}
