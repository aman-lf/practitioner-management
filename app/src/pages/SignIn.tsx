import React, { ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import * as api from "../api/api";

export default function SignIn(): ReactElement {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getErrorDetails = (errObj: any) => {
        let value: string = "";
        for (let key in errObj) {
            value += errObj[key].message + "\n";
        }
        return value;
    };

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            api.signin(email, password)
                .then((res) => {
                    console.log(res);
                    localStorage.setItem("token", res.data.data.accessToken);
                    navigate("../", { replace: true });
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.data.error.code === 400)
                            setError(getErrorDetails(err.response.data.error.details));
                        else setError(err.response.data.error.message);
                    } else if (err.message) setError(err.message);
                });
        } catch {
            setError("Failed to log in");
        }

        setLoading(false);
    }

    return (
        <div className="bg-skyblue">
            <Col md={{ span: 4, offset: 4 }} className="col-center">
                <Card className="card-shadow w-100 bg-lightBlue" style={{ maxWidth: "400px" }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign in</h2>

                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="user-form">
                            <Form.Group id="email">
                                <Form.Label>
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        size={"1x"}
                                        className="me-1"
                                    />
                                    Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>

                            <Form.Group id="password">
                                <Form.Label>
                                    <FontAwesomeIcon icon={faKey} size={"1x"} className="me-1" />
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>

                            <Button disabled={loading} className="w-50 mt-3" type="submit">
                                Sign In
                            </Button>
                        </Form>

                        <div className="w-100 text-center mt-2">
                            New user? <Link to="/signup">Sign up</Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
}
