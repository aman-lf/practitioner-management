import React, { useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

import IPractitioner from "../../interfaces/practitioner";
import SpecialistInput from "./SpecializationInput";

interface Props {
    handleSubmit: Function;
    data?: IPractitioner;
    title: string;
}

export default function PractitionerForm({ handleSubmit, data, title }: Props) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string | null>(null);
    const [contact, setContact] = useState<string | null>(null);
    const [dob, setDob] = useState<string | null>(null);
    const [workingDay, setWorkingDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const [isSpecialist, setIsSpecialist] = useState<boolean | number | null>(null);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [specialization, setSpecialization] = useState<string[]>([""]);

    const [imageDisplay, setImageDisplay] = useState("/default-user-image.png");

    useEffect(() => {
        // Only updating data that are available
        if (!data) return;
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.contact) setContact(data.contact);
        if (data.dob) setDob(data.dob.toDateString);
        if (data.working_day) setWorkingDay(data.working_day);
        if (data.start_time) setStartTime(data.start_time.toString());
        if (data.end_time) setEndTime(data.end_time.toString());
        if (data.is_specialist) setIsSpecialist(data.is_specialist);
        if (data.specialization && data.specialization.length > 0)
            setSpecialization(data.specialization);
        if (data.photo) {
            // Show in image display if available
            setImageDisplay(`${process.env.REACT_APP_FIREBASE_URL}${data.photo}?alt=media`);
        }
    }, [data]);

    const handleSpecialistChange =
        (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            let newSpecialist = specialization;
            newSpecialist[index] = value;
            setSpecialization([...newSpecialist]);
        };

    const handleAddSpecialist = () => {
        if (specialization) setSpecialization([...specialization, ""]);
    };

    const handleRemoveSpecialist = (index: number) => {
        const newSpecialist = [...specialization];
        newSpecialist.splice(index, 1);
        setSpecialization(newSpecialist);
    };

    const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setPhotoFile(img);
            setImageDisplay(URL.createObjectURL(img));
        }
    };

    const cleanSpecialist = (specialist: string[]) => {
        let result = specialist.filter((p) => p[0] || p[1]);
        if (result.length === 0) return null;
        return result;
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSubmit(
            {
                name: name,
                email: email,
                contact: contact,
                dob: dob,
                working_day: workingDay,
                start_time: startTime,
                end_time: endTime,
                is_specialist: isSpecialist === true ? 1 : 0,
                specialization: cleanSpecialist(specialization),
            },
            photoFile
        );
    };

    return (
        <div>
            <Container>
                <Col md={{ span: 8, offset: 2 }} className="py-4 text-start">
                    <h3>{title}</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <Form.Control
                                        type="file"
                                        placeholder="photo"
                                        onChange={onImageChange}
                                    />
                                </Col>
                                <Col className="text-center">
                                    <img
                                        src={imageDisplay}
                                        alt="contact"
                                        className="image-display m-3"
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <hr />

                        <Form.Group className="mb-3">
                            <FloatingLabel controlId="floatingInput" label="Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email ? email : ""}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formContact">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Contact"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="contact"
                                    value={contact ? contact : ""}
                                    onChange={(event) => setContact(event.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDob">
                            <FloatingLabel controlId="floatingInput" label="Dob" className="mb-3">
                                <Form.Control
                                    type="date"
                                    placeholder="2022/1/1"
                                    value={dob ? dob : ""}
                                    onChange={(event) => setDob(event.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formWorkingDay">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Working Day"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="string"
                                    placeholder="Mon"
                                    value={workingDay ? workingDay : ""}
                                    onChange={(event) => setWorkingDay(event.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formStartTime">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Start Time"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="time"
                                    placeholder="00:00"
                                    value={startTime ? startTime : ""}
                                    onChange={(event) => setStartTime(event.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEndTime">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="End Time"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="time"
                                    placeholder="00:00"
                                    value={endTime ? endTime : ""}
                                    onChange={(event) => setEndTime(event.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIsSpecialist">
                            <Form.Check
                                type="checkbox"
                                checked={isSpecialist ? true : false}
                                label="ICU Specialist"
                                onChange={(event) => setIsSpecialist(event.target.checked)}
                            />
                        </Form.Group>

                        <SpecialistInput
                            specialist={specialization}
                            handleSpecialistChange={handleSpecialistChange}
                            handleAddSpecialist={handleAddSpecialist}
                            handleRemoveSpecialist={handleRemoveSpecialist}
                        />

                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}
