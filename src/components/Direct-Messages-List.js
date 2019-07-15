import React from 'react';
import ChatContainer from '../containers/chat.container';
import { ChatType, CHAT_PER_PAGE } from '../constants/chat.constants';
import api from '../api'
import ViewStateContainer, { ViewType } from '../containers/view-state.container';
import { MenuItem, Menu, MenuHeader } from '../styled-components/ui'
import getPattern from '../utils/pattern-generator';
import SocketContainer from '../containers/socket.container';
import { Badge } from 'antd'
import handleError from '../error-handler';

const DirectMessagesList = (props) => {
    let chat = ChatContainer.useContainer()
    let viewState = ViewStateContainer.useContainer()
    let socketContainer = SocketContainer.useContainer()

    let onSelectUser = (user) => {

        console.log("user", user)
        chat.setSelectedChatInfo({
            chatType: ChatType.DIRECT,
            chatTitle: user.name,
            partner: user
        })
        api.messages.getDirectMessages(user.id).then((data) => {
            let messages = data.data.messages
            console.log(messages)
            chat.setCurrentMessages(messages)
        }).catch((error) => handleError(error.response))
        viewState.setContainerView(ViewType.CHAT)
    }

    return (
        <div>
            <MenuHeader>Direct Messages</MenuHeader>
            <Menu>
                {
                    chat.users.map((user) => (
                        <MenuItem key={user.id}>
                            <a href="#" onClick={() => onSelectUser(user)}>
                                <img src={getPattern(user.name)} style={{ height: 20, width: 20 }} />&nbsp;
                            {user.name}&nbsp;
                            {socketContainer.unReadNotification[user.id] &&
                                    <Badge count={socketContainer.unReadNotification[user.id].unRead} style={{ backgroundColor: '#52c41a' }} />
                                }
                            </a>
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    )
}

export default DirectMessagesList