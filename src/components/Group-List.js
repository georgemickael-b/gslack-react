import React from 'react';
import ChatContainer from '../containers/chat.container';
import { ChatType } from '../constants/chat.constants';
import api from '../api'
import ViewStateContainer, { ViewType } from '../containers/view-state.container';
import { Menu, MenuItem, MenuHeader } from '../styled-components/ui';
import getPattern from '../utils/pattern-generator';
import { Icon, Badge } from 'antd'
import SocketContainer from '../containers/socket.container';
import handleError from '../error-handler';


const GroupList = (props) => {
    let chat = ChatContainer.useContainer()
    let viewStateContainer = ViewStateContainer.useContainer()
    let socketContainer = SocketContainer.useContainer()

    let onCreateGroup = () => {
        props.history.push("/group/create")
    }

    let onSelectGroup = (group) => {
        viewStateContainer.setContainerView(ViewType.CHAT)
        chat.setSelectedChatInfo({
            chatType: ChatType.GROUP,
            chatTitle: group.name,
            group: group
        })
        api.messages.getGroupMessages(group._id).then((data) => {
            let messages = data.data.messages
            console.log(messages)
            chat.setCurrentMessages(messages)
        }).catch((error) => handleError(error.response))
    }

    return (
        <div>
            <MenuHeader>Groups Messages <a href="javascript:void(0);" onClick={onCreateGroup}>&nbsp;<Icon type="plus-circle" style={{ verticalAlign: 0 }} theme="outlined" /></a></MenuHeader>
            <Menu>
                {
                    chat.groups.map((group) => (
                        <MenuItem key={group._id}>

                            <a href="#" onClick={() => onSelectGroup(group)}><img src={getPattern(group.name)} style={{ height: 20, width: 20 }} />&nbsp;
                            {group.name}&nbsp;
                            {socketContainer.unReadNotification[group._id] &&
                                    <Badge count={socketContainer.unReadNotification[group._id].unRead} style={{ backgroundColor: '#52c41a' }} />
                                }
                            </a>
                        </MenuItem>
                    ))
                }
            </Menu>
        </div >
    )
}

export default GroupList