import React from 'react';
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import {connect} from "react-redux";



@connect(
    state=>state.ChatUser,
    {getUserList}
)
class Employee extends React.Component{
    componentDidMount() {
        this.props.getUserList('employer')
    }
    render() {
        return <UserCard userList={this.props.userList}/>
    }
}

export default Employee;