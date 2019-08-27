const express = require('express');
const userRouter = require("./user");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const Models = require('./model');
const User = Models.getModel('user');
const Chat = Models.getModel('chat');

//socket Work with express
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);



//io全局链接，socket当前连接
io.on('connection',function (socket) {
    console.log('user login');
    socket.on('sendmsg',function (data) {
        const {from,to,msg}=data;
        const chatid=[from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        });
    })
});








app.use(cookieParser());
app.use(bodyParser.json());
app.use("/user",userRouter);
server.listen(9093,function () {
    console.log("Node app start at 9093")
});