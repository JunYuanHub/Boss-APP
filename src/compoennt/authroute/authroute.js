import React from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux";
import { loadData } from '../../redux/user.redux'



//检测是否已经有cookie
@withRouter
@connect(
    state=>state.User,
    { loadData }
)
class AuthRoute extends React.Component{
    componentDidMount() {
        const publicList=['/login','/register'];
        const pathName = this.props.location.pathname;
        if(publicList.indexOf(pathName)>-1){
            return null;
        }
        //获取用户信息
        axios.get('/user/info').
        then(res=>{
            if(res.status===200 && res.data.code===0){
                this.props.loadData(res.data.userData);   //有路由信息就加载用户数据
            }
            else{
                this.props.history.push('/login')
            }
        })
    }
    render() {
        return null
    }
}

export default AuthRoute;