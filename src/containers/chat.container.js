
import { useState } from "react"
import { createContainer } from "unstated-next"

function useChat() {
    let [users, _setUsers] = useState([])
    let [selectedChatInfo, _setSelectedChatInfo] = useState({})
    let [currentMessages, _setCurrentMessages] = useState([])
    let [groups, _setGroups] = useState([])

    let setUsers = (users) => _setUsers(users)
    let setSelectedChatInfo = (users) => _setSelectedChatInfo(users)
    let pushToCurrentMessages = (message) => _setCurrentMessages(currentMessages.concat([message]))
    let concatToCurrentMessages = (inMessages) => _setCurrentMessages(inMessages.concat(currentMessages))
    let setCurrentMessages = (messages) => _setCurrentMessages(messages)
    let setGroups = (groups) => _setGroups(groups)

    return {
        users, setUsers, selectedChatInfo, setSelectedChatInfo, pushToCurrentMessages, currentMessages, setCurrentMessages,
        groups, setGroups, concatToCurrentMessages
    }
}

let ChatContainer = createContainer(useChat)
export default ChatContainer