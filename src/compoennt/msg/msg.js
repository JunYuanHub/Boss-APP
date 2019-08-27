import React from 'react';
import {List,Badge} from "antd-mobile";
import {connect} from "react-redux";

@connect(
    state=>state,
)
class Msg extends React.Component{
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const userId = this.props.User._id;     //当前用户ID
        const userInfo = this.props.Chat.users; //所有用户信息

        const msgGroup={};
        this.props.Chat.chatmsg.map(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v)
        });
        const chatmsgList=Object.values(msgGroup).sort((a,b)=>{
            const a_last = a[a.length-1].create_time;
            const b_last = b[b.length-1].create_time;
            return b_last-a_last;
        });

        return(
            <div>
                    {chatmsgList.map(v=>{
                        const lastItem=v[v.length-1];
                        const targetId=v[0].from===userId?v[0].to:v[0].from;
                        const unreadnum = v.filter(v=>!v.read&&v.to===userId).length;
                        if(!userInfo[targetId]){
                            return null
                        }
                        return(
                            <List key={lastItem._id}>
                                <Item
                                 extra={<Badge text={unreadnum}/>}
                                 thumb={require(`../img/${userInfo[targetId].avatar}.jpg`)}
                                 arrow={'horizontal'}
                                 onClick={()=>{
                                     this.props.history.push(`/chat/${targetId}`)
                                 }}>
                                    {lastItem.content}
                                    <Brief>{userInfo[targetId].name}</Brief>
                                </Item>
                            </List>
                        )
                    })}
            </div>
        )

    }
}

export default Msg;