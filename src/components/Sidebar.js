import React from 'react';
import DirectMessagesList from './Direct-Messages-List'
import AuthContainer from '../containers/auth.container';
import ViewStateContainer from '../containers/view-state.container'
import GroupList from './Group-List';
import { ViewType } from '../containers/view-state.container'
import getPattern from '../utils/pattern-generator';
import { SidebarHeaderWrapper } from '../styled-components/ui';
import { Icon } from 'antd'
import { AUTH_STORAGE_KEY } from '../constants/auth.constants';

const SidebarHeader = (props) => (
    <SidebarHeaderWrapper>

        <h4> <img src={getPattern(props.user.id)} style={{ height: 40, width: 40 }} />&nbsp;{props.user.name}</h4>
        <hr></hr>

    </SidebarHeaderWrapper>
);
const Sidebar = (props) => {
    let auth = AuthContainer.useContainer()
    let viewState = ViewStateContainer.useContainer()

    const logout = () => {
        auth.setAuthDetails(null)
        localStorage.removeItem(AUTH_STORAGE_KEY)
        props.history.push("/login")
    }
    return (
        <React.Fragment>
            <SidebarHeader user={auth.auth.user} ></SidebarHeader>
            <DirectMessagesList></DirectMessagesList>
            <GroupList {...props}></GroupList>
            <a href="javascript:void(0);" onClick={() => viewState.setContainerView(ViewType.THREADLIST)}>All Threads</a>

            <span style={{ position: 'absolute', bottom: 20 }}>

                <a href="javascript:void(0);" onClick={logout}> <Icon type="poweroff" /> Logout</a>
            </span>
        </React.Fragment>
    )
}


export default Sidebar