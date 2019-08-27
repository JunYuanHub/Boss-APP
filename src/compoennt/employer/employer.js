import React from 'react';
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'
import {connect} from "react-redux";



@connect(
    state=>state.ChatUser,
    {getUserList}
)
class Employer extends React.Component{
    componentDidMount() {
        this.props.getUserList('employee')
    }

    render() {
        return <UserCard userList={this.props.userList}/>
    }
}

export default Employer;