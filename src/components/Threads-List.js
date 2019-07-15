import React, { useEffect, useState } from 'react';
import ChatContainer from '../containers/chat.container';
import { ChatType } from '../constants/chat.constants';
import api from '../api'
import { ListGroup } from "react-bootstrap";
import { ThreadListItem } from "../styled-components/ui"
import { Icon } from "antd"
import handleError from '../error-handler';

const ThreadList = (props) => {
    let chat = ChatContainer.useContainer()
    let [threads, setThreads] = useState([])
    useEffect(() => {
        api.messages.getThreadList().then((data) => {
            console.log(data)
            setThreads(data.data)
        }).catch((error) => handleError(error.response))
    }, []);
    return (
        <div>
            <ListGroup variant="flush">
                {
                    threads.map((thread) => (
                        <ListGroup.Item style={{ padding: 0 }} key={thread._id} onClick={() => props.setThreadMessage(thread)}>
                            <ThreadListItem>
                                <div>
                                    <div className="name">{thread.creator.name}</div>
                                    <div>{thread.message}</div>
                                </div>
                                <span className="rightIcon">
                                    <Icon type="right" />
                                </span>
                            </ThreadListItem>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            {
                threads.length == 0 && <h6 style={{ textAlign: "center" }}>No Threads Yet</h6>
            }
        </div>
    )
}

export default ThreadList