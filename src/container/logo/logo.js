import React from 'react'
import logo from './logo.png'
import {LogoWrapper} from "./style"



class Logo extends React.Component{
    render() {
        return (
            <LogoWrapper>
                <img src={logo} alt="logo图片"/>
            </LogoWrapper>
        );
    }
}

export default Logo;