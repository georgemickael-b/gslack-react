import React, { useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import Select from 'react-select'
import ChatContainer from '../../containers/chat.container';
import AuthContainer from '../../containers/auth.container';

import api from '../../api';
import handleError from '../../error-handler';

function CreateGroup(props) {
    let chatContainer = ChatContainer.useContainer()
    let auth = AuthContainer.useContainer()

    let users = chatContainer.users.map((user) => {
        return {
            value: user.id,
            label: user.name
        }
    })
    let selectedUsers = []
    let name = ""
    console.log(users)
    useEffect(() => {
    }, []);
    let onNameChange = (event) => {
        name = event.target.value
    }
    let onSubmit = () => {
        let members = selectedUsers.map((user) => user.value)
        members.push(auth.auth.user.id)

        api.groups.create({ name, members }).then((data) => {
            chatContainer.groups.push(data.data)
            props.history.push("/chat")
        }).catch((error) => handleError(error.response))
    }
    let onUserChange = (users) => {
        selectedUsers = users
    }
    return (
        <Container style={{
            height: "100%", width: "100%", backgroundImage: `url(${require('../../assets/groupChat.png')})`, backgroundPosition: 'bottom',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
        }}>
            <Row>
                <Col md={3}></Col>
                <Col md={4} >
                    <h1>Create Group</h1>
                    <h6>Name of the Group</h6>

                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Awesome Group"
                            onChange={onNameChange}
                            required
                        />
                    </InputGroup>

                    <h6>Select members to add in group</h6>
                    <Select
                        isMulti
                        name="users"
                        options={users}
                        className="mb-3 basic-multi-select"
                        classNamePrefix="select"
                        onChange={onUserChange}
                    />
                    <Button variant="primary" onClick={onSubmit}>Create Group</Button>

                </Col>
            </Row>
        </Container >
    )
}

export default CreateGroup;
