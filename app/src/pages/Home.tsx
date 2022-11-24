import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar as favStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import * as api from "../api/api";
import IPractitioner from "../interfaces/practitioner";

export default function Home() {
    const [practitioners, setPractitioners] = useState<Array<IPractitioner>>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.getPractitioners().then((res) => {
            setPractitioners(res.data.data);
        });
    }, []);

    // Sort contact
    function compare(a: IPractitioner, b: IPractitioner) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
    const icuPractitioners = practitioners
        .filter((practitioner) => practitioner.is_specialist === 1)
        .sort(compare);
    const nonIcuPractitioners = practitioners.filter(
        (practitioner) => practitioner.is_specialist !== 1
    );

    const updateSpecialist = (id: number, is_specialist: boolean) => () => {
        const set_specialist = is_specialist ? 1 : 0;
        api.updateSpecialist(id, set_specialist).then((r) => {
            api.getPractitioner(id).then((res) => {
                const newPractitioners = practitioners.map((practitioner) => {
                    if (practitioner.id === id) return res.data.data;
                    return practitioner;
                });
                setPractitioners(newPractitioners);
            });
        });
    };

    const deletePractitioner = (id: number) => () => {
        if (!window.confirm("Delete practitioners?")) return;

        api.deletePractitioner(id).then((res) => {
            if (res.status === 202) {
                const newPractitioners = practitioners.filter(
                    (practitioner) => practitioner.id !== id
                );
                setPractitioners(newPractitioners);
            }
        });
    };

    const PractitionerBody = ({ label, data }: any) => {
        return (
            <>
                <tr className="subheading fw-bold">
                    <td>
                        {label} ({data.length})
                    </td>
                </tr>

                {data.map((practitioner: IPractitioner) => (
                    <tr key={practitioner.id} className="cursor-pointer">
                        <td>
                            <img
                                src={
                                    practitioner.photo
                                        ? `${process.env.REACT_APP_FIREBASE_URL}${practitioner.photo}?alt=media`
                                        : "/default-user-image.png"
                                }
                                alt="practitioners img"
                                className="home-image-display"
                            />
                            {practitioner.name}
                        </td>
                        <td>{practitioner.email ? practitioner.email : "-"}</td>
                        <td>{practitioner.contact ? practitioner.contact : "-"}</td>
                        <td>{practitioner.working_day ? practitioner.working_day : "-"}</td>
                        <td>
                            {/* Show different star if favourite */}
                            {practitioner.is_specialist === 1 ? (
                                <FontAwesomeIcon
                                    icon={favStar}
                                    size={"1x"}
                                    className="mx-2 cursor-pointer"
                                    onClick={updateSpecialist(practitioner.id, false)}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    size={"1x"}
                                    className="mx-2 cursor-pointer"
                                    onClick={updateSpecialist(practitioner.id, true)}
                                />
                            )}

                            <FontAwesomeIcon
                                icon={faEdit}
                                size={"1x"}
                                className="mx-2 cursor-pointer"
                                onClick={() => {
                                    navigate(`/update/${practitioner.id}`);
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                size={"1x"}
                                className="mx-2 cursor-pointer"
                                onClick={deletePractitioner(practitioner.id)}
                            />
                        </td>
                    </tr>
                ))}
            </>
        );
    };

    return (
        <Container>
            <div className="mt-4">
                <h2>Practitioner list</h2>
            </div>
            <hr />
            <Table borderless hover className="text-start">
                <thead className="border-bottom">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Working Day</th>
                    </tr>
                </thead>
                <tbody>
                    <PractitionerBody
                        label="ICU Specialist Practitioners"
                        data={icuPractitioners}
                    />
                </tbody>
                <tbody>
                    <PractitionerBody label="Practitioners" data={nonIcuPractitioners} />
                </tbody>
            </Table>
        </Container>
    );
}
