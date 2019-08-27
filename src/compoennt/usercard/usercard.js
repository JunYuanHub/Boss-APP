import React from 'react'
import {Card, WhiteSpace, WingBlank} from "antd-mobile";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


@withRouter
class UserCard extends React.Component {
    static propTypes={
        userList:PropTypes.array.isRequired,
    };
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        return (
            <WingBlank size="lg">
                {this.props.userList.map(v=>(
                    v.avatar?(
                            <div key={v._id}>
                                <WhiteSpace/>
                                <Card onClick={()=>this.handleClick(v)}>
                                    <Card.Header
                                        title={v.user}
                                        thumb={require(`../img/${v.avatar}.jpg`)}
                                        thumbStyle={{width:40,height:40}}
                                        extra={<span>{v.title}</span>}/>
                                    <Card.Body>
                                        {v.type==='employer'? <div>招聘公司：{v.company}</div>:null}
                                        {v.desc.split('\n').map(x=>(
                                            <div key={x}>{x}</div>
                                        ))}
                                        {v.type==='employer'? <div>薪资：{v.salary}</div>:null}
                                    </Card.Body>
                                </Card>
                            </div>)
                        : null
                ))}

            </WingBlank>
        )
    }
}
export default UserCard;