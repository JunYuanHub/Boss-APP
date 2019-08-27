import axios from "axios";
import io from 'socket.io-client'
const socket = io('ws://localhost:9093');  //ws是websocket


const MSG_LIST="ChatRedux/msg_list";
const MSG_RECV="ChatRedux/msg_recv";
const MSG_READ="ChatRedux/msg_read";


const init={
    chatmsg:[],
    users:{},
    unread:0,
};
export function Chat(state=init,action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state,
                chatmsg:action.data.msgList,
                users:action.data.users,
                unread:action.data.msgList.filter(
                    v=>action.data.userid===v.to && !v.read
                ).length};
        case MSG_RECV:
            const n= action.data.to===action.userid?1:0;
            return {...state,chatmsg:[...state.chatmsg,action.data],unread:state.unread+n};
        case MSG_READ:
            const {from,num} = action.data;
            return {...state,
                chatmsg:state.chatmsg.map(v=>({...v, read:from===v.from?true:v.read})),
                unread:state.unread-num};
        default:
            return state;
    }
}



export function getMsgList() {
    function msgList(msgList,users,userid) {
        return({type:MSG_LIST,data:{msgList,users,userid}})
    }
    return async (dispatch,getState)=>{
        const res=await axios.get('/user/getmsglist')
        if(res.data.code===0&&res.status===200){
            console.log("收到后台数据：",res);
            const userid = getState().User._id;
            dispatch(msgList(res.data.msglist,res.data.users,userid))
        }
    }
}

export function sendMsg({from,to,msg}) {
    return dispatch=> {
        socket.emit('sendmsg',{from,to,msg})
    }
}

export function recvMsg(){
    function msgRecv(data,userid) {
        return {type:MSG_RECV,data:data,userid:userid}
    }
    return (dispatch,getState)=>{
        socket.on('recvmsg',function (data) {
            console.log('您发送的信息为：',data);
            const userid=getState().User._id;
            dispatch(msgRecv(data,userid))
        })
    }
}
//读取"from"发过来的信息
export function readMsg(from) {
    function msgRead(from,userId,num){
        return {type:MSG_READ,data:{from,userId,num}}
    }

    return async (dispatch,getState)=>{
        const res=await axios.post('/user/readmsg',{from})
        const userId=getState().User._id;
        if(res.status===200&&res.data.code===0){
            dispatch(msgRead(from,userId,res.data.num))
        }
    }
}