import React, { useEffect, useState } from 'react';
import api from "../api"
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Message from './Message'
import handleError from '../error-handler';
import ViewStateContainer from '../containers/view-state.container';
const { Header, Content, Footer, Sider } = Layout;

const Thread = (props) => {
    let [messages, setMessages] = useState([])
    let [newMessage, setNewMessage] = useState("")
    let parentMessage = props.parentMessage
    let viewStateContainer = ViewStateContainer.useContainer()
    useEffect(() => {
        if (parentMessage) {
            api.messages.getThreadMessages(parentMessage._id).then((data) => {
                setMessages(data.data.messages)
            }).catch((error) => handleError(error.response))
        }
    }, [props.parentMessage]);
    let onMessageChange = (event) => {
        setNewMessage(event.target.value)
    }
    let onSend = () => {
        console.log("send", parentMessage)
        api.messages.sendThreadMessage(newMessage, parentMessage._id, parentMessage.creator._id).then((data) => {
            setMessages(messages.concat([data.data]))
            setNewMessage("")
        }).catch((error) => handleError(error.response))
    }
    let onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            onSend();
        }
    }
    return (
        <Layout style={{ background: 'white', borderLeft: "1px solid #e3e3e3" }} >
            <Header style={{ background: '#fff', paddingLeft: "10px", fontSize: "20px", borderBottom: "1px solid #e3e3e3" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>
                        Thread : {parentMessage.creator.name}
                    </span>

                    <a href="javascript:void(0);" onClick={() => viewStateContainer.setDisplayThreadPanel(false)}><Icon type="close-circle" /></a>
                </div>
            </Header>
            <Content style={{ padding: "10px", height: 'calc(100vh - 64px )', overflow: 'auto' }}>
                <Message message={parentMessage} canThread={false}>
                </Message>
                <hr></hr>
                {
                    messages.map((message) => (
                        <Message key={message._id} message={message} canThread={false}>
                        </Message>
                    ))
                }
                <div>
                    <textarea value={newMessage || ''} style={{ width: '100%' }} onChange={onMessageChange} onKeyDown={onEnterPress} >
                    </textarea>
                </div>
            </Content>
        </Layout >
    )
}


export default Thread