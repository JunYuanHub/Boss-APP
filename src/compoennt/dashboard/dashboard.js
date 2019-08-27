import React from 'react'
import {connect} from "react-redux";
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navLinkBar/navLinkBar'
import { Route,Switch } from 'react-router-dom'
import Employer from '../employer/employer'
import Employee from '../employee/employee'
import UserInfo from '../userinfo/userinfo'
import {getMsgList,recvMsg} from "../../redux/chat.redux";
import Msg from '../msg/msg'

@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class DashBoard extends React.Component{
    componentDidMount() {
        if(this.props.Chat.chatmsg.length===0){
            this.props.getMsgList();
            this.props.recvMsg()
        }
    }

    render() {
        const user = this.props.User;
        const {pathname} = this.props.location;
        const navList=[
        {
            path:'/employer',
            text:"牛人",
            icon:'boss',
            title:'牛人列表',
            component:Employer,
            hide:user.type==='employee'
        },{
            path:'/employee',
            text:"BOSS",
            icon:'job',
            title:'BOSS列表',
            component:Employee,
            hide:user.type==='employer'
        },{
            path:'/msg',
            text:"消息",
            icon:'msg',
            title:'消息列表',
            component:Msg,
        },{
            path:'/me',
            text:"我",
            icon:'user',
            title:'个人中心',
            component:UserInfo,
        }];
        return(
            <div>
                <NavBar mode={'dark'}>{navList.find(v=>v.path===pathname).title}</NavBar>
                <Switch>
                    {navList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}/>
                    ))}
                </Switch>
                <NavLinkBar data={navList}/>
            </div>
        )
    }
}

export default DashBoard;