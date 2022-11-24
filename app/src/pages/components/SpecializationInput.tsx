import React from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

interface Props {
    specialist: string[];
    handleSpecialistChange: Function;
    handleAddSpecialist: Function;
    handleRemoveSpecialist: Function;
}

export default function SpecialistInput({
    specialist,
    handleSpecialistChange,
    handleAddSpecialist,
    handleRemoveSpecialist,
}: Props) {
    const lastElement = specialist.length - 1;

    return (
        <Form.Group controlId="formSpecialist">
            {specialist.map((num, index) => (
                <Row className="align-items-center mb-3" key={"spec" + index}>
                    <Col>
                        <FloatingLabel controlId="floatingInput" label="Specialist">
                            <Form.Control
                                type="text"
                                placeholder="Specialist"
                                value={num}
                                onChange={handleSpecialistChange(index)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col xs={1}>
                        {index === lastElement ? (
                            <FontAwesomeIcon
                                icon={faPlusSquare}
                                size={"2x"}
                                className="cursor-pointer"
                                onClick={(e) => handleAddSpecialist()}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faMinusSquare}
                                size={"2x"}
                                className="cursor-pointer"
                                onClick={() => handleRemoveSpecialist(index)}
                            />
                        )}
                    </Col>
                </Row>
            ))}
        </Form.Group>
    );
}
