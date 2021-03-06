import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AUTH_STORAGE_KEY } from "../../constants/auth.constants";
import AuthContainer from "../../containers/auth.container";
import SocketContainer from "../../containers/socket.container";
import { message } from 'antd';
import api from "../../api"

const Login = (props) => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let authConatiner = AuthContainer.useContainer()
    let socketContainer = SocketContainer.useContainer()

    useEffect(() => {
        let authFromLocalStorage = localStorage.getItem(AUTH_STORAGE_KEY)
        if (authFromLocalStorage) {
            authFromLocalStorage = JSON.parse(authFromLocalStorage)
            setAuth(authFromLocalStorage)
        }
    }, []);

    const setAuth = (authData) => {
        if (authData && authData.token && authData.token.accessToken) {
            authConatiner.setAuthDetails(authData)
            api.setServiceInterceptor(authData.token.accessToken)
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
            socketContainer.initSocket(authData.user.id)

            props.history.push("/chat")
        }
    }

    const validateForm = () => {
        return email.length > 3 && password.length > 0;
    }

    const handleChange = (event) => {
        console.log(event.target)
        let { id, value } = event.target
        if (id === "email")
            setEmail(value)
        else if (id === "password")
            setPassword(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        api.auth.login({
            email: email,
            password: password
        }).then((data) => {
            setAuth(data.data)
        }).catch(err => {
            console.log(err.response)
            message.error(err.response.data.message);
        })
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="4">
                    <h3>Login</h3>
                    <hr />
                    <Form>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email}
                                onChange={handleChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!validateForm()}
                            onClick={handleSubmit}>
                            Login
                            </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );

}

export default Login