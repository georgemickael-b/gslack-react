
import { useState } from "react"
import { createContainer } from "unstated-next"
import { AUTH_STORAGE_KEY } from '../constants/auth.constants'
import api from '../api'
import SocketContainer from "./socket.container"

function useAuth() {
    let socketContainer = SocketContainer.useContainer()
    let authFromLocalStorage = localStorage.getItem(AUTH_STORAGE_KEY)
    if (authFromLocalStorage) {
        authFromLocalStorage = JSON.parse(authFromLocalStorage)
        api.setServiceInterceptor(authFromLocalStorage.token.accessToken)
        socketContainer.initSocket(authFromLocalStorage.user.id)
    }

    let setAuthDetails = (auth) => setAuth(auth)

    let [auth, setAuth] = useState(authFromLocalStorage)
    return { auth, setAuthDetails }
}

let AuthContainer = createContainer(useAuth)
export default AuthContainer