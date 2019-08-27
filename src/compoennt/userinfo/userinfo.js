import React from 'react'
import { List,Result,WhiteSpace,Modal } from "antd-mobile";
import {connect} from "react-redux";
import browserCookie from 'browser-cookies'   //操控cookies
import { Redirect } from 'react-router-dom'
import { logoutUser } from "../../redux/user.redux";


@connect(
    state=>state.User,
    {logoutUser}
)
class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
    }
    logout(){
        const alert=Modal.alert;
        alert('注销',"确认要退出登陆吗？",[
            {text:'取消',onPress:console.log('cancel')},
            {text:'确认',onPress:()=>{
                    browserCookie.erase('userId');
                    this.props.logoutUser();
                }}

            ]);
    }
    render() {
        return this.props.user ? (
                <div>
                    <Result
                        img={<img src={require(`../img/${this.props.avatar}.jpg`)} style={{width:50}} alt=""/>}
                        title={this.props.user}
                        message={this.props.type==='employer'?this.props.company:null}/>
                    <List renderHeader={this.props.type==='employer'?'招聘岗位':'个人介绍'}>
                        <List.Item
                            multipleLine>
                            {this.props.title}
                            {this.props.desc.split('\n').map(v=>
                            <List.Item.Brief key={v}>{v}</List.Item.Brief>)}
                            {this.props.salary?<List.Item.Brief>提供薪资：{this.props.salary}</List.Item.Brief>:null}
                        </List.Item>
                    </List>
                    <WhiteSpace/>
                    <List>
                        <List.Item onClick={this.logout}>退出登录</List.Item>
                    </List>
                </div>
                )
                : <Redirect to={this.props.redirectTo}/>
    }
}

export default UserInfo;