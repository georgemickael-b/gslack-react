import styled from 'styled-components';

export const Menu = styled.ul`
  padding:0px;
`

export const MenuItem = styled.li`
  list-style-type: none;
  padding:5px;
  margin:0px;
  color:white;
  &:hover {
    background: #ffffff30;   
  }
  & > a {
    color : whitesmoke;
    display : block;
    line-height:10px;
  }
`;


export const SidebarWrapper = styled.div`
  background : #130f40;
  height:100%;
  padding:10px;
`;

export const SidebarHeaderWrapper = styled.div`
  & > h4{
    color : whitesmoke;
  }
`;

export const MenuHeader = styled.h6`
  color : whitesmoke;
`;

export const ChatHeader = styled.h5`
padding: 10px 0 10px 0;
background : white;
display : block;
width:100%;
border-bottom : 1px solid #e3e3e3;
height:50px;
`

export const ThreadListItem = styled.div`
padding:10px;
display : flex;
justify-content: space-between;
&:hover { 
  background: #e4f1fe;
  cursor : pointer;
}
& > div > .name {
  font-weight:bold;
}

& > .rightIcon{
  display: flex;
  justify-content: center;
  align-items: center;
}
`

export const MessageWrapper = styled.div`
marginBottom: 10px;
padding:5px;
&:hover { 
  background: #e4f1fe;
  cursor : pointer;
}
`