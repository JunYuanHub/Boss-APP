import React from 'react';
import {List,InputItem,NavBar,Icon,Grid} from "antd-mobile";
import io from 'socket.io-client'
import {connect} from "react-redux";
import {sendMsg,recvMsg,getMsgList,readMsg} from "../../redux/chat.redux";
import { getChatId } from "../../redux/util";

const socket = io('ws://localhost:9093');  //ws是websocket

@connect(
    state=>state,
    {sendMsg,recvMsg,getMsgList,readMsg}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            msg:[],
            showEmoji:false,
        }
    }
    componentDidMount() {
        if(this.props.Chat.chatmsg.length===0){
            this.props.getMsgList();
            this.props.recvMsg()
        }
    }
    componentWillUnmount() {
        const to=this.props.match.params.user;
        this.props.readMsg(to)    //每次打开相应对话框，视为消息全部已读
    }

    //修正Grid跑马灯的bug
    fixCarousel(){
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSend(){
        const from = this.props.User._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:'',showEmoji:false});
    }
    render() {
        const emoji="😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😒 😓 😔 😤 😢 😭 😺 😸 😹 😻 😼 😽 🙀 😿 😾 🍌⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️  🍉 🍇 🍓 🍈 🍒 🍑 🍍 🎍 🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🚗 🚕 🚙 🚌"
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}));

        const userid=this.props.match.params.user;
        const Item= List.Item;
        const users=this.props.Chat.users;
        //还没获取信息列表前返回null
        if(!users[userid]){
            return null;
        }

        const chatid=getChatId(userid, this.props.User._id);
        const chatmsg=this.props.Chat.chatmsg.filter(v=>v.chatid===chatid);
        return(
            <div id='chat-page' >
                <NavBar
                    mode={'dark'}
                    icon={<Icon type={'left'}/>}
                    onLeftClick={()=>this.props.history.goBack()}
                    onClick={()=>this.setState({showEmoji:false})}>
                    {users[userid].name}
                </NavBar>
                {chatmsg.map(v=>{
                    const ava=require(`../img/${users[v.from].avatar}.jpg`);
                        return v.from===userid
                                ?(<List key={v._id} onClick={()=>this.setState({showEmoji:false})}>
                                    <Item thumb={ava}>{v.content}</Item>
                                  </List>)
                                :(<List key={v._id} onClick={()=>this.setState({showEmoji:false})}>
                                    <Item
                                        extra={<img src={ava} alt=""/>}
                                        className={'chat-me'}
                                    >{v.content}</Item>
                                 </List>)
                    })
                }
                <div className={'stick-footer'}>
                    <List>
                        <InputItem
                            placeholder={'请输入'}
                            value={this.state.text}
                            onChange={(v)=>{this.setState({text:v})}}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight:15,cursor:"pointer"}}
                                        onClick={()=>{
                                            this.setState({showEmoji:!this.state.showEmoji});
                                            this.fixCarousel();}
                                        }>
                                        😃</span>
                                    <span onClick={() => this.handleSend()}>发送</span>
                                </div>}
                        />
                        {this.state.showEmoji ?
                            <Grid
                                data={emoji}
                                columnNum={8}
                                carouselMaxRow={3}
                                isCarousel={true}
                                onClick={v=>this.setState({text:this.state.text+v.text})}/>
                            : null}
                    </List>
                </div>
            </div>)
    }
}

export default Chat;