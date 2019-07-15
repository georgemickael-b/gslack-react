import React, { useEffect, useState } from 'react';
import ChatContainer from '../../containers/chat.container';
import Sidebar from '../../components/Sidebar';
import ChatArea from '../../components/ChatArea';
import api from '../../api'
import Thread from '../../components/Thread'
import ThreadList from '../../components/Threads-List';
import ViewStateContainer, { ViewType } from '../../containers/view-state.container'
import SocketContainer from '../../containers/socket.container';
import { SidebarWrapper } from '../../styled-components/ui'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import handleError from '../../error-handler';

const { Header, Content, Footer, Sider } = Layout;

function Chat(props) {
    let chat = ChatContainer.useContainer()
    let socketContainer = SocketContainer.useContainer()
    let viewState = ViewStateContainer.useContainer()
    let [threadMessage, setThreadMessage] = useState(null)

    useEffect(() => {
        api.users.getAll().then((data) => {
            let users = data.data
            chat.setUsers(users)
        }).catch((error) => handleError(error.response))

        api.groups.get().then((data) => {
            let groups = data.data
            chat.setGroups(groups)
        }).catch((error) => handleError(error.response))

        api.notifications.get().then((data) => {
            let notifications = data.data
            let notificationObj = {}
            for (let notification of notifications) {
                notificationObj[notification.from] = notification
            }
            socketContainer.setUnReadNotification(notificationObj)
        }).catch((error) => handleError(error.response))
    }, []);

    useEffect(() => {
        let inMessage = socketContainer.incomingMessage;
        if (chat.selectedChatInfo.partner && chat.selectedChatInfo.partner.id == inMessage.creator._id)
            chat.setCurrentMessages(chat.currentMessages.concat(socketContainer.incomingMessage))
    }, [socketContainer.incomingMessage])

    const selectThread = (thread) => {
        viewState.setDisplayThreadPanel(true)
        setThreadMessage(thread)
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsed={false}>
                <SidebarWrapper>
                    <Sidebar  {...props}></Sidebar>
                </SidebarWrapper>
            </Sider>
            <Layout style={{ background: 'white' }}>
                <Header style={{ textTransform: 'capitalize', background: '#fff', paddingLeft: "10px", fontSize: "20px", borderBottom: "1px solid #e3e3e3" }}>
                    {viewState.containerView === ViewType.CHAT && chat.selectedChatInfo.chatTitle}
                    {viewState.containerView === ViewType.THREADLIST && 'All Threads'}
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div sm={viewState.displayThreadPanel ? 5 : 9} md={viewState.displayThreadPanel ? 5 : 9} lg={viewState.displayThreadPanel ? 5 : 9} >
                        {viewState.containerView === ViewType.THREADLIST && (<ThreadList setThreadMessage={selectThread}></ThreadList>)}
                        {viewState.containerView === ViewType.CHAT && (<ChatArea setThreadMessage={selectThread}></ChatArea>)}
                        {!viewState.containerView && <div>
                            <div style={{
                                height: "250px", width: "100%", backgroundImage: `url(${require('../../assets/startChat1.png')})`, backgroundPosition: 'bottom',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "center"
                            }}></div>
                            <h5 style={{ textAlign: 'center' }}>Start Chatting By Choosing User/ Group from options in the Left.</h5>
                        </div>
                        }
                    </div>


                </Content>
            </Layout>
            {
                viewState.displayThreadPanel &&
                <Sider collapsed={false} width="30%" theme="light">
                    <Thread parentMessage={threadMessage}></Thread>
                </Sider>
            }
        </Layout >
    )
}

export default Chat;
