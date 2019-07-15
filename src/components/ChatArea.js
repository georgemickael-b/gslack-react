import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import ChatContainer from '../containers/chat.container';
import api from '../api'
import { ChatType, CHAT_PER_PAGE } from '../constants/chat.constants';
import Message from './Message';
import useStayScrolled from 'react-stay-scrolled';
import { Waypoint } from 'react-waypoint';
import handleError from '../error-handler';

const ChatArea = (props) => {
    let chat = ChatContainer.useContainer()
    let { chatTitle, partner, group, chatType } = chat.selectedChatInfo
    let [message, setMessage] = useState("")
    let [scrollHeight, setScrollHeight] = useState(0)

    const listRef = useRef();
    const { stayScrolled, isScrolled, scrollBottom, scroll } = useStayScrolled(listRef);

    const clearUnReadCount = () => {
        let creatorId, groupId;
        if (partner)
            creatorId = partner.id
        if (group)
            groupId = group._id
        api.notifications.clearUnReadCount({ creator: creatorId, group: groupId }).then(() => { })
    }

    useEffect(() => {
        setScrollHeight(listRef.current.scrollHeight)
    }, [])
    useEffect(() => {
        clearUnReadCount()
    }, [partner, group, chatType])

    useLayoutEffect(() => {
        let scrollAmount = 1.75 * ((listRef.current.scrollHeight - scrollHeight) - listRef.current.offsetHeight)
        if (scrollAmount >= 0)
            scroll(scrollAmount)
        else
            scrollBottom()
    }, [chat.currentMessages.length || 0])


    const onMessageChange = (event) => {
        setMessage(event.target.value)
    }
    const onSend = () => {
        if (!message)
            return
        let sendMessage, target;

        if (chatType == ChatType.GROUP) {
            sendMessage = api.messages.sendGroupMessage
            target = group._id
        }
        else if (chatType == ChatType.DIRECT) {
            sendMessage = api.messages.sendDirectMessage
            target = partner.id
        }

        sendMessage(message, target).then((data) => {
            chat.pushToCurrentMessages(data.data)
            scrollBottom()
            setMessage("")
        }).catch((error) => handleError(error.response))
    }

    let loadMore = (e) => {
        setScrollHeight(listRef.current.scrollHeight)
        if (chat.selectedChatInfo.partner || chat.selectedChatInfo.group) {
            setTimeout(() => {
                let getMessages, target
                if (chatType == ChatType.GROUP) {
                    getMessages = api.messages.getGroupMessages
                    target = chat.selectedChatInfo.group._id
                }
                else if (chatType == ChatType.DIRECT) {
                    getMessages = api.messages.getDirectMessages
                    target = chat.selectedChatInfo.partner.id
                }
                getMessages(target, chat.currentMessages.length).then((data) => {
                    let messages = data.data.messages
                    console.log(messages)
                    chat.concatToCurrentMessages(messages)
                })
            }, 500)
        }
    }


    let onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            onSend();
        }
    }

    return (
        <div style={{ position: 'relative' }}>
            <div ref={listRef} style={{ height: 'calc(100vh - 64px - 100px)', overflow: 'auto', width: '100%' }}>
                {chat.selectedChatInfo.chatType &&
                    <div >
                        <Waypoint onEnter={loadMore} />
                        {
                            chat.currentMessages.map((message) => (
                                <Message key={message._id} message={message} {...props} canThread={true}></Message>
                            ))
                        }
                        {chat.currentMessages.length == 0 && <h6 style={{ textAlign: "center" }}>No Messages Yet.</h6>}
                    </div>
                }
            </div >
            <div style={{ height: "100px", width: "100%", maxWidth: "100%", position: "absolute" }}>
                <textarea value={message || ''} style={{ width: '100%', height: "90px" }} onChange={onMessageChange} onKeyDown={onEnterPress} >
                </textarea>
            </div>
        </div>
    )
}

export default ChatArea