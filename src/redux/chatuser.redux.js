import axios from "axios";

const USER_LIST='ChatUser/user_list';




const init={
    userList:[]
};
export function ChatUser(state=init,action) {
    switch(action.type){
        case USER_LIST:
            return {...state,userList:action.userList};
        default:
            return state
    }
}





export function getUserList(type) {
    function userList(data) {
        return {type:USER_LIST,userList:data}
    }

    return async dispatch=>{
        const res=await axios.get('/user/list?type='+type)
        if(res.data.code===0){
            dispatch(userList(res.data.data))
        }
    }
}