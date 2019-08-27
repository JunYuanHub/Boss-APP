import { combineReducers } from 'redux'
import { User } from "./redux/user.redux";
import { ChatUser } from "./redux/chatuser.redux";
import { Chat } from "./redux/chat.redux";

export default combineReducers({User,ChatUser,Chat})