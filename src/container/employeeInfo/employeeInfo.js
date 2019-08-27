import React from 'react'
import AvatarSelector from '../../compoennt/avatarSelector/avatarSelector'
import {InputItem,TextareaItem,Button,NavBar} from "antd-mobile";
import { updateInfo } from '../../redux/user.redux'
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom'


@connect(
    state=>state.User,
    {updateInfo}
)
class EmployeeInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            desc:'',
            avatar:'',
        };
        this.onChange=this.onChange.bind(this);
    }
    onChange(key,val){
        this.setState({[key]:val})
    }
    render() {
        const path=this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}/> :null}
                <NavBar mode={'dark'}>牛人个人信息</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })}
                    }/>
                <InputItem onChange={(v)=>this.onChange('title',v)}>求职岗位</InputItem>
                <TextareaItem
                    onChange={(v)=>this.onChange('desc',v)}
                    title='个人简介'
                    rows={3}
                    autoHeight/>
                <Button onClick={()=>this.props.updateInfo(this.state)} type={'primary'}>提交</Button>
            </div>
        )
    }
}

export default EmployeeInfo;