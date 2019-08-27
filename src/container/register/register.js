import React from 'react'
import Logo from "../logo/logo";
import {register} from '../../redux/user.redux'
import { connect } from 'react-redux'
import {List, InputItem, WingBlank, Button, Radio, NoticeBar, Icon} from "antd-mobile";
import { Redirect } from 'react-router-dom'


//@connect(mapState,mapDispatch)等价于export default connect(mapState,mapDispatch)(组件)
@connect(
    state=>state.User,
    {register}
)
class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:'',
            user:'',
            pwd:'',
            repeatpwd:'',
        };
        this.handleRegister=this.handleRegister.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render() {
        const RadioItem=Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> :null}
                <Logo/>
                <WingBlank>
                    <List>
                        {/*错误信息提示*/}
                        {this.props.msg
                            ? <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
                                {this.props.msg}
                              </NoticeBar>
                            : null}

                        <InputItem onChange={(v)=>this.handleChange('user',v)}>用户名</InputItem>
                        <InputItem type='password'
                                   onChange={(v)=>this.handleChange('pwd',v)}>密码</InputItem>
                        <InputItem type='password'
                                   onChange={(v)=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
                        {/*当满足checked内条件时，显示为勾选*/}
                        <RadioItem onChange={() => this.handleChange('type','employee')}
                                   checked={this.state.type==='employee'}>牛人</RadioItem>
                        <RadioItem onChange={() => this.handleChange('type','employer')}
                                   checked={this.state.type==='employer'}>Boss</RadioItem>
                        <Button type={'primary'} onClick={this.handleRegister}>注册</Button>
                    </List>
                </WingBlank>
            </div>

        )
    }
}

export default Register;