import React from 'react'
import Logo from "../logo/logo";
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from'react-router-dom'
import { List,InputItem,WingBlank,WhiteSpace,Button,NoticeBar,Icon } from "antd-mobile";
import UserForm from '../../compoennt/user-form/userform'



@connect(
    state=>state.User,
    {login}
)
@UserForm
class Login extends React.Component{
    constructor(props){
        super(props);
        this.toRegister=this.toRegister.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    toRegister(){
        this.props.history.push('/register')
    }
    render() {
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/> :null}
                <Logo/>

                {/*错误信息提示*/}
                {this.props.msg?
                    <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
                        {this.props.msg}
                    </NoticeBar>
                : null}

                <WingBlank>
                    <List>
                        <InputItem onChange={(v)=>this.props.handleChange('user',v)}>用户名</InputItem>
                        <InputItem type={'password'} onChange={(v)=>this.props.handleChange('pwd',v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleLogin} type={'primary'}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister} type={'primary'}>注册</Button>
                </WingBlank>
            </div>

        )
    }
}

export default Login;