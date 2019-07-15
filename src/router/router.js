import React from "react";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute"
import Login from "../pages/auth/login"
import Chat from "../pages/chat/chat"
import AuthContainer from "../containers/auth.container";
import ChatContainer from "../containers/chat.container";
import CreateGroup from "../pages/chat/create-group";
import ViewStateContainer from "../containers/view-state.container"
import SocketContainer from "../containers/socket.container"
import Register from "../pages/auth/register";

function AppRouter() {
    return (
        <SocketContainer.Provider>
            <AuthContainer.Provider>
                <ChatContainer.Provider>
                    <ViewStateContainer.Provider>
                        <Router>
                            <Route path="/" exact render={() => (
                                <Redirect to="/chat"></Redirect>
                            )} />
                            <Route path="/group/create" component={CreateGroup} />
                            <Route path="/login" render={(props) => (
                                < Login {...props} />
                            )} />
                            <Route path="/register" render={(props) => (
                                < Register {...props} />
                            )} />
                            <PrivateRoute path="/chat" component={Chat} />
                        </Router>
                    </ViewStateContainer.Provider>
                </ChatContainer.Provider>
            </AuthContainer.Provider>
        </SocketContainer.Provider>
    )

}

export default AppRouter;