import axios from 'axios'
import { BASE_API_URL } from './config';


class MessageApi {
    api
    constructor(api) {
        this.api = api
    }
    getDirectMessages = (senderId, skip = 0) => { return this.api.get("messages", { sender: senderId, skip: skip }) }
    sendDirectMessage = (message, recipient) => { return this.api.post("messages", { message, recipient }) }
    getGroupMessages = (groupId, skip = 0) => { return this.api.get("messages", { group: groupId, skip: skip }) }
    sendGroupMessage = (message, recipientGroup) => { return this.api.post('messages', { message, recipientGroup }) }
    getThreadMessages = (parentMessage) => { return this.api.get('messages', { parentMessage: parentMessage }) }
    sendThreadMessage = (message, parentMessage, recipient) => { return this.api.post('messages', { message, parentMessage, recipient }) }
    getThreadList = () => { return this.api.get('messages/threads') }
}

class UserApi {
    api
    constructor(api) {
        this.api = api
    }
    getAll = () => { return this.api.get('users') }
}

class AuthApi {
    api
    constructor(api) {
        this.api = api
    }
    login = ({ email, password }) => { return this.api.post('/auth/login', { email, password }) }
    register = ({ email, password, name }) => { return this.api.post('/auth/register', { email, password, name }) }
}

class GroupApi {
    api
    constructor(api) {
        this.api = api
    }
    create = ({ name, members }) => { return this.api.post('groups', { name, members }) }
    get = () => { return this.api.get('groups') }

}

class NotificationApi {
    api
    constructor(api) {
        this.api = api
    }
    get = () => { return this.api.get('notifications') }
    clearUnReadCount = ({ creator, group }) => { return this.api.put('notifications/clear-unread', { creator, group }) }
}

class API {
    messages
    users
    auth
    groups
    notifications
    constructor() {
        this.messages = new MessageApi(this)
        this.users = new UserApi(this)
        this.auth = new AuthApi(this)
        this.groups = new GroupApi(this)
        this.notifications = new NotificationApi(this)
    }
    service = axios.create({
        timeout: 20000
    })
    setServiceInterceptor = (token) => {
        this.service.interceptors.request.use(
            config => {
                config.headers['Authorization'] = 'Bearer ' + token
                return config
            },
            error => {
                Promise.reject(error)
            }
        )
    }
    url = (path, queries = {}) => {
        let queryStr = "?"
        for (let key of Object.keys(queries)) {
            queryStr += key + "=" + queries[key] + "&"
        }
        queryStr = queryStr.slice(0, -1);
        return `${BASE_API_URL}/${path}${queryStr}`
    }

    get(path, queries = {}) { return this.service.get(this.url(path, queries), { withCredentials: true }) }
    post(path, body) { return this.service.post(this.url(path), body, { withCredentials: true }) }
    put(path, body) { return this.service.put(this.url(path), body, { withCredentials: true }) }
}
let api = new API()
export default api