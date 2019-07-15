
import { useState } from "react"
import { createContainer } from "unstated-next"
import socketIOClient from "socket.io-client";
import { BASE_SOCKET_URL } from "../config";

function useSocket() {
    let [incomingMessage, setIncomingMesssage] = useState()
    let [unReadNotification, setUnReadNotification] = useState({})
    let socket;
    let initSocket = (userId) => {
        let socket = socketIOClient(BASE_SOCKET_URL, { query: `userId=${userId}` })
        socket.on("MESSAGE_CREATED", (data) => {
            setIncomingMesssage(data)
        })
        socket.on("NOTIFICATION_NEW_MESSAGE", (data) => {
            if (data) {
                let notifications = JSON.parse(JSON.stringify(unReadNotification))
                notifications[data.from] = data
                setUnReadNotification(notifications)
            }
        })
    }
    return {
        incomingMessage, initSocket, unReadNotification, setUnReadNotification
    }
}

let SocketContainer = createContainer(useSocket)
export default SocketContainer
